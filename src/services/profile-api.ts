
const UPLOAD_AVATAR_API = process.env.NEXT_PUBLIC_UPLOAD_AVATAR_API;
const UPLOAD_COVER_API = process.env.NEXT_PUBLIC_UPLOAD_COVER_API;

export const uploadImage = async (
    file: File,
    type: "avatar" | "cover",
    userId: string
): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const endpoint =
            type === "avatar"
                ? `${UPLOAD_AVATAR_API}/${userId}`
                : `${UPLOAD_COVER_API}/${userId}`;

        const response = await fetch(endpoint, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const result = await response.json();
        return result.url || null;
    } catch (err) {
        console.error("Upload error:", err);
        return null;
    }
};
