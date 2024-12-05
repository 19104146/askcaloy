import { cookies } from "next/headers"

import { ChatWrapper } from "@/components/ChatWrapper"
import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"

type PageProps = {
    params: Promise<{
        url: string | string[] | undefined
    }>
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component))
    return decodedComponents.join("/")
}

export const maxDuration = 60

export default async function Page(props: PageProps) {
    const sessionCookie = (await cookies()).get("sessionId")?.value
    const reconstructedUrl = reconstructUrl({ url: (await props.params).url as string[] })

    const sessionId = `${reconstructedUrl}--${sessionCookie}`.replace(/\//g, "")

    const isIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    const initialMessages = await ragChat.history.getMessages({ sessionId, amount: 10 })

    if (!isIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: {
                chunkOverlap: 50,
                chunkSize: 200,
            },
        })

        await redis.sadd("indexed-urls", reconstructedUrl)
    }

    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
}
