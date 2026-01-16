import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_TOTAL_BYTES = 25 * 1024 * 1024;
const MAX_FILES = 6;

const STORAGE_BUCKET = "quotes-photos";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function serviceLabel(v: string) {
  switch (v) {
    case "matelas":
      return "Nettoyage matelas";
    case "canape":
      return "Nettoyage canapé en tissu";
    case "tapis":
      return "Nettoyage tapis";
    case "moquette":
      return "Nettoyage moquette";
    default:
      return "Autre / non précisé";
  }
}

function isLikelyEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function normalizePhone(v: string) {
  return v.trim().replace(/[^\d+]/g, "");
}

function isLikelyPhone(v: string) {
  const p = normalizePhone(v);
  const digits = p.replace(/\D/g, "");
  return digits.length >= 8;
}

function safeExt(filename: string) {
  const raw = (filename.split(".").pop() || "").toLowerCase().trim();
  if (!raw) return "jpg";
  if (!/^[a-z0-9]{1,8}$/.test(raw)) return "jpg";
  return raw;
}

type Item = {
  service?: string;
  dimensions?: string;
  details?: string;
};

export async function POST(req: Request) {
  try {
    const RESEND_FROM = process.env.RESEND_FROM;
    const RESEND_TO_OWNER = process.env.RESEND_TO_OWNER;
    const SITE_URL = process.env.SITE_URL ?? "https://moket.fr";

    if (!process.env.RESEND_API_KEY || !RESEND_FROM || !RESEND_TO_OWNER) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Config email manquante. Vérifie RESEND_API_KEY, RESEND_FROM, RESEND_TO_OWNER.",
        },
        { status: 500 }
      );
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Config Supabase manquante. Vérifie SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 }
      );
    }

    const form = await req.formData();

    const payload = {
      service: String(form.get("service") ?? ""),
      city: String(form.get("city") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      address: String(form.get("address") ?? ""),

      dimensions: String(form.get("dimensions") ?? ""),
      details: String(form.get("details") ?? ""),
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      items_json: String(form.get("items_json") ?? ""),
    };

    const files = (form.getAll("photos").filter(Boolean) as File[]).slice(
      0,
      MAX_FILES
    );

    // --- Validation de base
    if (!payload.name || payload.name.trim().length < 2) {
      return NextResponse.json({ ok: false, message: "Nom requis." }, { status: 400 });
    }
    if (!payload.city || payload.city.trim().length < 2) {
      return NextResponse.json({ ok: false, message: "Ville requise." }, { status: 400 });
    }
    if (!payload.postalCode || payload.postalCode.trim().length < 4) {
      return NextResponse.json(
        { ok: false, message: "Code postal requis." },
        { status: 400 }
      );
    }

    // ✅ email OU téléphone obligatoire
    const hasEmail = payload.email && payload.email.trim().length > 0;
    const hasPhone = payload.phone && payload.phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      return NextResponse.json(
        { ok: false, message: "Indique un email ou un téléphone." },
        { status: 400 }
      );
    }
    if (hasEmail && !isLikelyEmail(payload.email)) {
      return NextResponse.json({ ok: false, message: "Email invalide." }, { status: 400 });
    }
    if (hasPhone && !isLikelyPhone(payload.phone)) {
      return NextResponse.json(
        { ok: false, message: "Téléphone invalide." },
        { status: 400 }
      );
    }

    const totalBytes = files.reduce((acc, f) => acc + (f.size ?? 0), 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          message: "Photos trop lourdes. Merci de réduire (max ~25MB au total).",
        },
        { status: 413 }
      );
    }

    // Parse multiprestations
    let items: Item[] | null = null;
    if (payload.items_json) {
      try {
        const parsed = JSON.parse(payload.items_json);
        if (Array.isArray(parsed)) items = parsed;
      } catch {
        // ignore
      }
    }

    // =========================
    // 1) INSERT DB (quote)
    // =========================
    const { data: quote, error: quoteErr } = await supabaseAdmin
      .from("quotes")
      .insert({
        service: payload.service,
        city: payload.city,
        postal_code: payload.postalCode,
        address: payload.address?.trim() || null,

        name: payload.name.trim(),
        email: hasEmail ? payload.email.trim() : null,
        phone: hasPhone ? normalizePhone(payload.phone) : null,

        items: items ?? null,
        details: payload.details?.trim() || null,
        dimensions: payload.dimensions?.trim() || null,

        photos: null,
        meta: {
          source: "web",
          userAgent: req.headers.get("user-agent") ?? null,
        },
      })
      .select("id, created_at")
      .single();

    if (quoteErr || !quote?.id) {
      console.error("SUPABASE insert quote error:", quoteErr);
      return NextResponse.json(
        { ok: false, message: "Erreur enregistrement devis." },
        { status: 500 }
      );
    }

    const quoteId = quote.id as string;

    // =========================
    // 2) UPLOAD Storage
    // =========================
    const uploaded: Array<{
      path: string;
      publicUrl: string | null;
      filename: string | null;
      contentType: string | null;
      size: number | null;
    }> = [];

    for (const file of files) {
      const ext = safeExt(file.name || "photo.jpg");
      const path = `${quoteId}/${randomUUID()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: upErr } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(path, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (upErr) {
        console.error("SUPABASE storage upload error:", upErr);
        continue;
      }

      // Public URL (si bucket public)
      const { data: pub } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path);

      uploaded.push({
        path,
        publicUrl: pub?.publicUrl ?? null,
        filename: file.name || null,
        contentType: file.type || null,
        size: typeof file.size === "number" ? file.size : null,
      });
    }

    // Update row avec photos (même si 0 upload -> [] c’est OK)
    const { error: updErr } = await supabaseAdmin
      .from("quotes")
      .update({ photos: uploaded })
      .eq("id", quoteId);

    if (updErr) {
      console.error("SUPABASE update photos error:", updErr);
      // on ne bloque pas le flow email
    }

    // =========================
    // 3) HTML emails
    // =========================
    const prestationsHtml =
      items && items.length > 0
        ? `
          <h3 style="margin:18px 0 10px">Prestations</h3>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr>
                <th align="left" style="padding:8px;border-top:1px solid #e2e8f0;color:#475569;font-size:12px">Type</th>
                <th align="left" style="padding:8px;border-top:1px solid #e2e8f0;color:#475569;font-size:12px">Dimensions</th>
                <th align="left" style="padding:8px;border-top:1px solid #e2e8f0;color:#475569;font-size:12px">Détails</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map((it) => {
                  const type = serviceLabel(String(it.service ?? "autre"));
                  const dim = (it.dimensions ?? "").trim();
                  const det = (it.details ?? "").trim();
                  return `
                    <tr>
                      <td style="padding:8px;border-top:1px solid #e2e8f0">${esc(type)}</td>
                      <td style="padding:8px;border-top:1px solid #e2e8f0">${esc(dim || "-")}</td>
                      <td style="padding:8px;border-top:1px solid #e2e8f0">${esc(det || "-")}</td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
        `
        : "";

    // PJ pour l’email owner (tu gardes tes pièces jointes)
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name || "photo.jpg",
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const subjectOwner = `Nouveau devis #${quoteId} — ${serviceLabel(
      payload.service
    )} — ${payload.city} (${payload.postalCode})`;

    const ownerHtml = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
        <h2 style="margin:0 0 12px">Nouvelle demande de devis</h2>
        <p style="margin:0 0 8px;color:#334155"><strong>ID :</strong> ${esc(quoteId)}</p>
        <p style="margin:0 0 16px;color:#334155">
          <strong>${esc(serviceLabel(payload.service))}</strong> — ${esc(payload.city)} (${esc(payload.postalCode)})
        </p>

        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-top:1px solid #e2e8f0"><strong>Nom</strong></td><td style="padding:8px;border-top:1px solid #e2e8f0">${esc(payload.name)}</td></tr>
          <tr><td style="padding:8px;border-top:1px solid #e2e8f0"><strong>Email</strong></td><td style="padding:8px;border-top:1px solid #e2e8f0">${esc(payload.email || "-")}</td></tr>
          <tr><td style="padding:8px;border-top:1px solid #e2e8f0"><strong>Téléphone</strong></td><td style="padding:8px;border-top:1px solid #e2e8f0">${esc(payload.phone || "-")}</td></tr>
          <tr><td style="padding:8px;border-top:1px solid #e2e8f0"><strong>Adresse</strong></td><td style="padding:8px;border-top:1px solid #e2e8f0">${esc(payload.address?.trim() || "-")}</td></tr>
          <tr><td style="padding:8px;border-top:1px solid #e2e8f0"><strong>Photos</strong></td><td style="padding:8px;border-top:1px solid #e2e8f0">${files.length}</td></tr>
          <tr><td style="padding:8px;border-top:1px solid #e2e8f0"><strong>Photos uploadées</strong></td><td style="padding:8px;border-top:1px solid #e2e8f0">${uploaded.length}</td></tr>
        </table>

        ${
          uploaded.length > 0
            ? `<p style="margin:14px 0 0"><strong>Liens Storage :</strong><br/>${uploaded
                .map((p) => (p.publicUrl ? `<a href="${esc(p.publicUrl)}">${esc(p.publicUrl)}</a>` : esc(p.path)))
                .join("<br/>")}</p>`
            : ""
        }

        ${prestationsHtml}

        <p style="margin:16px 0 0;color:#64748b;font-size:12px">
          Envoyé depuis ${esc(SITE_URL)}
        </p>
      </div>
    `;

    // 1) owner
    const ownerSend = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO_OWNER,
      subject: subjectOwner,
      html: ownerHtml,
      attachments,
    });

    const prestationsClientHtml =
      items && items.length > 0
        ? `
      <div style="margin:14px 0 0">
        <h3 style="margin:0 0 10px;font-size:14px">Prestations demandées</h3>
        <div style="border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;overflow:hidden">
          ${items
            .map((it, i) => {
              const type = serviceLabel(String(it.service ?? "autre"));
              const dim = (it.dimensions ?? "").trim();
              const det = (it.details ?? "").trim();

              const parts = [
                dim ? `Dimensions : ${esc(dim)}` : "",
                det ? `Détails : ${esc(det)}` : "",
              ].filter(Boolean);

              return `
                <div style="padding:10px 12px;${i > 0 ? "border-top:1px solid #e2e8f0" : ""}">
                  <div style="font-weight:600;color:#0f172a">${esc(type)}</div>
                  ${
                    parts.length
                      ? `<div style="margin-top:6px;color:#334155;font-size:13px">${parts.join("<br/>")}</div>`
                      : `<div style="margin-top:6px;color:#64748b;font-size:13px">Aucun détail supplémentaire.</div>`
                  }
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `
        : "";

    if ((ownerSend as any).error) {
      console.error("RESEND ownerSend.error:", (ownerSend as any).error);
      return NextResponse.json(
        {
          ok: false,
          message: "Erreur envoi email interne (owner).",
          debug: (ownerSend as any).error,
        },
        { status: 502 }
      );
    }

    // 2) confirmation client si email
    if (hasEmail) {
      const clientSend = await resend.emails.send({
        from: RESEND_FROM,
        to: payload.email.trim(),
        subject: "Demande de devis reçue — MOKET",
        replyTo: RESEND_TO_OWNER,
        html: `
  <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.6">
    <h2 style="margin:0 0 10px">Merci ${esc(payload.name)} 👋</h2>
    <p style="margin:0 0 14px;color:#334155">
      Nous avons bien reçu votre demande de devis.
    </p>

    <div style="padding:12px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc">
      <h3 style="margin:0 0 10px;font-size:14px">Récapitulatif</h3>

      <p style="margin:0 0 8px">
        <strong>Lieu :</strong> ${esc(payload.address?.trim() || `${payload.city} (${payload.postalCode})`)}
      </p>
      <p style="margin:0 0 8px">
        <strong>Photos :</strong> ${files.length}
      </p>
      <p style="margin:0">
        <strong>Prestation principale :</strong> ${esc(serviceLabel(payload.service))}
      </p>
    </div>

    ${prestationsClientHtml}

    <p style="margin:14px 0;color:#334155">
      On revient vers vous rapidement avec un <strong>prix clair</strong> et une <strong>proposition de créneau</strong>.
    </p>

    <p style="margin:10px 0 0;color:#94a3b8;font-size:12px">
      Référence interne : ${esc(quoteId)}
    </p>
  </div>
`,
      });

      if ((clientSend as any).error) {
        console.error("RESEND clientSend.error:", (clientSend as any).error);
      }
    }

    return NextResponse.json({
      ok: true,
      quoteId,
      message:
        "Demande envoyée. On revient vers vous rapidement avec un devis clair.",
    });
  } catch (err) {
    console.error("API /devis error:", err);
    return NextResponse.json(
      { ok: false, message: "Erreur serveur. Réessayez ou appelez-nous." },
      { status: 500 }
    );
  }
}
