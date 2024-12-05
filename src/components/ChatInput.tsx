"use client"

import { Button, Textarea } from "@nextui-org/react"
import { SendIcon } from "lucide-react"
import type { useChat } from "ai/react"

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type SetInput = ReturnType<typeof useChat>["setInput"]

type ChatInputProps = {
    input: string
    setInput: SetInput
    handleInputChange: HandleInputChange
    handleSubmit: HandleSubmit
}

export function ChatInput({ input, setInput, handleInputChange, handleSubmit }: ChatInputProps) {
    return (
        <div className="absolute bottom-0 left-0 z-10 w-full bg-zinc-900">
            <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                    <div className="relative flex w-full flex-grow flex-col p-4">
                        <form className="relative">
                            <Textarea
                                autoFocus
                                minRows={4}
                                value={input}
                                placeholder="Enter your question..."
                                className="resize-none rounded-xl bg-zinc-800 text-base hover:bg-zinc-900"
                                onChange={handleInputChange}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && !event.shiftKey) {
                                        event.preventDefault()
                                        handleSubmit()
                                        setInput("")
                                    }
                                }}
                            />
                            <Button
                                size="sm"
                                type="submit"
                                className="absolute bottom-2 right-2 z-10 border border-border bg-zinc-900"
                            >
                                <SendIcon className="size-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
