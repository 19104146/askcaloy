import { NextRequest } from "next/server"
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs"

import { ragChat } from "@/lib/rag-chat"

export async function POST(request: NextRequest) {
    const { messages, sessionId } = await request.json()
    const lastMessage = messages[messages.length - 1].content

    const response = await ragChat.chat(lastMessage, { sessionId, streaming: true })

    return aiUseChatAdapter(response)
}
