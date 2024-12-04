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

export default async function Page(props: PageProps) {
    const params = await props.params
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] })
    const isIndexed = await redis.sismember("indexed-urls", reconstructedUrl)
    const sessionId = "mock-session"

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

    return <ChatWrapper sessionId={sessionId} />
}
