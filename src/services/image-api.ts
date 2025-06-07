import axios from "axios";


export const uploadComment = async (
    imageId: string,
    text: string,
    userId: string
): Promise<boolean> => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_UPLOAD_COMMENTS_API}${imageId}`,
            { text, userId }
        );
        return !!res.data;
    } catch (error) {
        console.error("❌ Upload comment failed:", error);
        return false;
    }
};

