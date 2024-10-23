import { NextResponse } from 'next/server'
import { parseCookies } from 'nookies'

export function middleware() {
  // Get the Authorization header from the request
  const cookies = parseCookies()
  const userData = cookies['userToken']

  // Check if the header exists and has the format 'Bearer <token>'
  if (userData) {
    NextResponse.redirect('/login')
  } else {
    NextResponse.redirect('/pages/login')
  }

  return NextResponse.next()
}
export const config = {
  matcher: []
}
