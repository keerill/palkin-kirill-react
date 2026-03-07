import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_NAME } from './utils/storage';

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get(ACCESS_TOKEN_NAME);
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (isLoginPage && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login'],
};
