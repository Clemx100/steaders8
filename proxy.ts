import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PORTAL_PATHS = ['/investor/login', '/investor/register', '/admin/login']

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isPublicPortalPath = PUBLIC_PORTAL_PATHS.some((p) => pathname.startsWith(p))

  if (!user && !isPublicPortalPath) {
    const loginUrl = request.nextUrl.clone()
    const requestedPath = pathname + request.nextUrl.search
    loginUrl.search = ''
    if (pathname.startsWith('/admin')) {
      loginUrl.pathname = '/admin/login'
    } else {
      loginUrl.pathname = '/investor/login'
      loginUrl.searchParams.set('next', requestedPath)
    }
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/investor/:path*', '/admin/:path*'],
}
