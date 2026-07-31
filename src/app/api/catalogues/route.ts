import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL ?? 'https://localhost:8443';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const perPage = searchParams.get('per_page') ?? '10';
  const page = searchParams.get('page') ?? '1';

  const targetUrl = `${BACKEND_URL}/api/catalogues?per_page=${perPage}&page=${page}`;

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.error(`[/api/catalogues] backend returned ${res.status} for ${targetUrl}`);
      return NextResponse.json(
        { error: 'Failed to fetch catalogues from backend' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(`[/api/catalogues] fetch error → ${targetUrl}:`, err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
