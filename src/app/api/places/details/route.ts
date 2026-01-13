// app/api/places/details/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getComponent(components: any[] | undefined, type: string) {
  if (!components?.length) return '';
  const found = components.find((c) => Array.isArray(c.types) && c.types.includes(type));
  return found?.long_name ?? '';
}

function extractCityAndPostal(components: any[] | undefined) {
  const postalCode = getComponent(components, 'postal_code') || getComponent(components, 'postal_code_prefix') || '';

  const city =
    getComponent(components, 'locality') ||
    getComponent(components, 'postal_town') ||
    getComponent(components, 'administrative_area_level_3') ||
    getComponent(components, 'sublocality') ||
    getComponent(components, 'administrative_area_level_2') ||
    '';

  return { city, postalCode };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = (searchParams.get('placeId') ?? '').trim();

  if (!placeId) return NextResponse.json({ ok: false, error: 'Missing placeId' }, { status: 400 });

  const key = process.env.GOOGLE_MAPS_API_KEY; // <- NON PUBLIC
  if (!key) return NextResponse.json({ ok: false, error: 'Missing GOOGLE_MAPS_API_KEY' }, { status: 500 });

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=address_component` +
    `&key=${encodeURIComponent(key)}` +
    `&language=fr`;

  const r = await fetch(url, { cache: 'no-store' });
  const data = await r.json();

  if (data.status !== 'OK') {
    return NextResponse.json({ ok: false, error: 'Place details failed' }, { status: 200 });
  }

  const comps = data.result?.address_components as any[] | undefined;
  const { city, postalCode } = extractCityAndPostal(comps);

  return NextResponse.json({ ok: true, city, postalCode });
}
