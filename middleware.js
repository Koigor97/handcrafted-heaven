import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const verifiedToken = token && (await verifyToken(token));

  if (!verifiedToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (request.nextUrl.pathname === '/dashboard') {
    const role = verifiedToken?.role;

    if (role !== 'artisan') {
      return NextResponse.redirect(new URL('/auth/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/cart', '/orders', '/profile', '/checkout']
};
