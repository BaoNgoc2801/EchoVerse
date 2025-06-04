import axios from "axios";

export interface StreamItem {
    id: string;
    title: string;
    url: string;
    creatorId: string;
}

export const fetchTrendingStreams = async (): Promise<StreamItem[]> => {
    try {
        const token = localStorage.getItem("auth_token");

        console.log("🔐 Token:", token);

        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};

        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMAGES_API}`, {
            headers,
        });

        console.log("✅ Fetched streams:", res.data);

        return res.data?.data || [];
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Axios Error:", error.response?.data || error.message);
        } else {
            console.error("❌ Unknown Error:", error);
        }

        return [];
    }
};
