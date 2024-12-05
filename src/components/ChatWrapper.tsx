"use client"

import { Message, useChat } from "ai/react"

import { ChatInput } from "@/components/ChatInput"
import { Messages } from "@/components/Messages"

type ChatWrapperProps = {
    sessionId: string
    initialMessages: Message[]
}

export function ChatWrapper({ sessionId, initialMessages }: ChatWrapperProps) {
    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat-stream",
        body: {
            sessionId,
        },
        initialMessages,
    })

    return (
        <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-700 bg-zinc-900">
            <div className="flex flex-1 flex-col justify-between bg-zinc-800 text-black">
                <Messages messages={messages} />
            </div>

            <ChatInput
                input={input}
                setInput={setInput}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
