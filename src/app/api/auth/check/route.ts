import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL ?? 'https://localhost:8443';

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
