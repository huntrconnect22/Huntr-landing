import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/api-config';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user`, {
      headers: {
        Accept: 'application/json',
        Cookie: request.headers.get('cookie') ?? '',
      },
      cache: 'no-store',
    });

    return NextResponse.json({ loggedIn: res.ok });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
