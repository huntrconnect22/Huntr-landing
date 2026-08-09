import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/api-config';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const targetUrl = `${BACKEND_URL}/api/rfqs/public/${id}`;

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json({ rfq: null }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(`[/api/rfqs/${id}] fetch error:`, err);
    return NextResponse.json({ rfq: null }, { status: 500 });
  }
}
