import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const sessionId = request.cookies.get("sessionId")

    if (!sessionId) {
        response.cookies.set("sessionId", crypto.randomUUID())
    }

    return response
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
