import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Se for rota pública ou assets internos, permitir
  if (PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Se for rota do dashboard, verificar token
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/clients') || 
      pathname.startsWith('/processes') || pathname.startsWith('/finance') ||
      pathname.startsWith('/documents') || pathname.startsWith('/agenda') ||
      pathname.startsWith('/deadlines') || pathname.startsWith('/settings')) {
    
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirecionar para login se não tiver token
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

