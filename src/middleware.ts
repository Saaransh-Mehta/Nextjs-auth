import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
const path = request.nextUrl.pathname

const protectedPath = path === '/profle'

const isPublicPath = path === '/signup'|| path === '/login'

const token = request.cookies.get('jwt')?.value || ""

if(isPublicPath && token){
    return NextResponse.redirect(new URL('/profile',request.nextUrl))
}

if(!token && !isPublicPath){
    return NextResponse.redirect(new URL('/signup',request.nextUrl))
}

}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile'
  ]
}