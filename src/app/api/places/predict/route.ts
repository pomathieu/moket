// app/api/places/predict/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // évite edge si tu veux
export const dynamic = 'force-dynamic';

type PlaceSuggestion = {
  place_id: string;
  description: string;
  main_text?: string;
  secondary_text?: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (q.length < 3) return NextResponse.json({ ok: true, predictions: [] });

  const key = process.env.GOOGLE_MAPS_API_KEY; // <- NON PUBLIC
  if (!key) return NextResponse.json({ ok: false, error: 'Missing GOOGLE_MAPS_API_KEY' }, { status: 500 });

  const url =
    `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
    `?input=${encodeURIComponent(q)}` +
    `&key=${encodeURIComponent(key)}` +
    `&language=fr` +
    `&components=country:fr` +
    `&types=address`;

  const r = await fetch(url, { cache: 'no-store' });
  const data = await r.json();

  if (data.status !== 'OK') {
    return NextResponse.json({ ok: true, predictions: [] });
  }

  const predictions: PlaceSuggestion[] = (data.predictions ?? []).slice(0, 6).map((p: any) => ({
    place_id: p.place_id,
    description: p.description,
    main_text: p.structured_formatting?.main_text,
    secondary_text: p.structured_formatting?.secondary_text,
  }));

  return NextResponse.json({ ok: true, predictions });
}
