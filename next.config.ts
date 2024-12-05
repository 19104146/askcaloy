import type { NextConfig } from "next"

export default {
    eslint: {
        ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
} satisfies NextConfig
