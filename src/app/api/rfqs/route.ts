import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/api-config';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const perPage = searchParams.get('per_page') ?? '20';
  const page    = searchParams.get('page') ?? '1';
  const search  = searchParams.get('search') ?? '';
  const status  = searchParams.get('status') ?? 'open';

  const params = new URLSearchParams({ per_page: perPage, page, status });
  if (search) params.set('search', search);

  const targetUrl = `${BACKEND_URL}/api/rfqs/public?${params.toString()}`;

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.error(`[/api/rfqs] backend returned ${res.status} for ${targetUrl}`);
      return NextResponse.json({ data: [], total: 0, per_page: 20, current_page: 1 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(`[/api/rfqs] fetch error → ${targetUrl}:`, err);
    return NextResponse.json({ data: [], total: 0, per_page: 20, current_page: 1 });
  }
}
