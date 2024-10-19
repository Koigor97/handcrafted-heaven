import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const verifiedToken = token && (await verifyToken(token));

  if (request.nextUrl.pathname.startsWith('/auth/login') && !verifiedToken) {
    return;
  }

  // if (
  //   (request.url.includes('/login') || request.url.includes('/signup')) &&
  //   verifiedToken
  // ) {
  //   console.log('You are already logged in');
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  const {
    role
  } = async () => {
    if (verifiedToken) verifiedToken.payload;
  };

  if (request.nextUrl.pathname.startsWith('/dashboard') && role !== 'artisan') {
    return NextResponse.redirect(new URL('/auth/onboarding', request.url));
  }

  return NextResponse.next();
}
