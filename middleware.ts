import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })
  
  const publicRoutes = [
    "/about",
    "/alimentos",
    "/ejercicio",
    "/login",
    "/register"
  ]

  const { pathname } = req.nextUrl

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const userRole = token.permiso

  if (pathname.startsWith('/panel') && userRole !== 1) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname.startsWith('/portalNutricionista') && userRole !== 2) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname === '/profile' && userRole !== 1 && userRole !== 2) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = { 
  matcher: [
    "/panel/:path*", 
    "/portalNutricionista/:path*", 
    "/profile"
  ]
}
