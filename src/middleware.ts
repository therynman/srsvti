import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Enforce Basic Auth on any route under /admin
  if (url.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    const validUser = process.env.ADMIN_USERNAME || 'admin';
    const validPwd = process.env.ADMIN_PASSWORD || 'password';

    if (!basicAuth || !basicAuth.startsWith('Basic ')) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }

    try {
      const authValue = basicAuth.split(' ')[1];
      const decodedValue = atob(authValue);
      const [user, pwd] = decodedValue.split(':');

      if (user !== validUser || pwd !== validPwd) {
        return new NextResponse('Authentication Failed', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
          },
        });
      }
    } catch (e) {
      return new NextResponse('Malformed Authentication', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
