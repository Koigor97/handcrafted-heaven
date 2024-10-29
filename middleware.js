import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const verifiedToken = token && (await verifyToken(token));

  const protectedRoutes = [
    '/cart',
    '/orders',
    '/profile',
    '/checkout',
    '/dashboard'
  ];

  if (!verifiedToken) {
    const response = NextResponse.next();
    response.cookies.delete('token');

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return response;
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
  matcher: ['/', '/dashboard', '/cart', '/orders', '/profile', '/checkout']
};
