import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secretKey = process.env.JWT_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === '/') {
    return NextResponse.redirect(new URL('/products', req.url));
  }

  const protectedRoutes = ['/product', '/products', '/users', '/categories'];
  const publicRoutes = ['/login'];

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isPublic = publicRoutes.some((route) => path.startsWith(route));

  const token = req.cookies.get('session')?.value;

  if (token) {
    const { payload } = await jwtVerify(token, encodedKey).catch(() => ({
      payload: null,
    }));

    if (payload?.sub && isPublic) {
      return NextResponse.redirect(new URL('/products', req.url));
    }

    if (isProtected && !payload?.sub) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
