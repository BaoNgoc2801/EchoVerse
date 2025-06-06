import axios from "axios";

export interface StreamItem {
    id: string;
    title: string;
    url: string;
    creatorId: string;
}

export interface ImageDetail {
    id: string;
    title: string;
    url: string;
    creator?: { name?: string };
}

export interface CommentItem {
    id: string;
    text: string;
    user?: { name?: string };
}



export const fetchTrendingStreams = async (): Promise<StreamItem[]> => {
    try {
        const token = localStorage.getItem("auth_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMAGES_API}`, { headers });
        return res.data?.data || [];
    } catch (error: any) {
        console.error("❌ Fetch trending streams error:", error);
        return [];
    }
};

export const fetchImageDetail = async (id: string): Promise<ImageDetail | null> => {
    try {
        const token = localStorage.getItem("auth_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMAGES_DETAILS_API}/${id}`, { headers });
        return res.data?.data || null;
    } catch (error) {
        console.error("❌ Fetch image detail error:", error);
        return null;
    }
};

export const fetchComments = async (id: string): Promise<CommentItem[]> => {
    try {
        const token = localStorage.getItem("auth_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${process.env.NEXT_PUBLIC_COMMENTS_API}/${id}`, { headers });
        return Array.isArray(res.data?.data) ? res.data.data : [res.data.data];
    } catch (error) {
        console.error("❌ Fetch comments error:", error);
        return [];
    }
};


export const uploadComments = async (
    id: string,
    text: string,
    userId: string
): Promise<boolean> => {
    try {
        const token = localStorage.getItem("auth_token");  // lấy token xác thực
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        await axios.post(
            `${process.env.NEXT_PUBLIC_UPLOAD_COMMENTS_API}/${id}`, // endpoint API
            { text, userId },                                       // payload gửi
            { headers }                                             // headers: bearer token
        );

        return true;  // Thành công
    } catch (error) {
        console.error("❌ Upload comment error:", error);  // Ghi log lỗi
        return false;  // Thất bại
    }
};
