import { ragChat } from "@/lib/rag-chat"

type PageProps = {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component))
    if (decodedComponents[0] === "https:") {
        decodedComponents[0] = "https://"
    }
    return decodedComponents.join("/")
}

export default async function Page({ params }: PageProps) {
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] })

    await ragChat.context.add({
        type: "html",
        source: reconstructedUrl,
        config: {
            chunkOverlap: 50,
            chunkSize: 200,
        },
    })

    return <p>Hello!</p>
}
