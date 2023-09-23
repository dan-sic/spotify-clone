import { getIronSession } from 'iron-session/edge'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import ironSessionOptions from './lib/api/iron-session-options'

const authRoutes = ['/signup', '/signin']

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()

  const session = await getIronSession(req, res, ironSessionOptions)

  // if request to auth route and user is logged in, redirect to home
  if (authRoutes.includes(req.nextUrl.pathname) && !!session.user) {
    return NextResponse.redirect(req.nextUrl.origin)
  }

  // if request to non-auth route and user is not logged in, redirect to signin
  if (!authRoutes.includes(req.nextUrl.pathname) && !session.user) {
    return NextResponse.redirect(req.nextUrl.origin + '/signin')
  }

  return res
}

export const config = {
  /**
   * The matcher property is used to match the incoming request URL against a regular expression.
   * In this case, it matches all URLs that do not contain the strings "api", "_next/static", "_next/image", or "favicon.ico".
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
