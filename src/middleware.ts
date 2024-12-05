import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const sessionId = request.cookies.get("sessionId")

    if (!sessionId) {
        response.cookies.set("sessionId", crypto.randomUUID())
    }

    return response
}
