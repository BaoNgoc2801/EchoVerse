import axios from "axios";

const PROFILE_API_URL = process.env.NEXT_PUBLIC_PROFILE_API!;
const UPLOAD_AVATAR_API = process.env.NEXT_PUBLIC_UPLOAD_AVATAR_API!;

export async function fetchUserProfile() {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("No token found");

  try {
    const res = await axios.get(PROFILE_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;
    if (data.code !== 0 || !data.result)
      throw new Error("Invalid profile data");
    return data.result;
  } catch (err: any) {
    console.error(
      "❌ fetchUserProfile error:",
      err.response?.data || err.message
    );
    throw new Error("Failed to fetch user profile");
  }
}
  
export async function uploadAvatar(userId: number, file: File) {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("No token provided");
  if (!file) throw new Error("No file provided");

  const url = `${UPLOAD_AVATAR_API}/${userId}`;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.result;
  } catch (err: any) {
    console.error("❌ uploadAvatar error:", err.response?.data || err.message);
    throw new Error("Failed to upload avatar");
  }
}
