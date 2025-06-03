
import axios from "axios"

export interface StreamItem {
    id: string
    title: string
    url: string
    creatorId: string
}

export const fetchTrendingStreams = async (): Promise<StreamItem[]> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMAGES_API}`)
        return res.data?.data || []
    } catch (error) {
        console.error("Error fetching trending streams:", error)
        return []
    }
}
