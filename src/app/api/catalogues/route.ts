import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL ?? 'https://localhost:8443';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const perPage = searchParams.get('per_page') ?? '10';
  const page = searchParams.get('page') ?? '1';

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/catalogues?per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 300 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch catalogues from backend' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[/api/catalogues] fetch error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
