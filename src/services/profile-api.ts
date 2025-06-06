import axios from "axios";

const PROFILE_API_URL = process.env.NEXT_PUBLIC_PROFILE_API!;
const UPLOAD_AVATAR_API = process.env.NEXT_PUBLIC_UPLOAD_AVATAR_API!;
const UPLOAD_COVER_IMAGE = process.env.NEXT_PUBLIC_UPLOAD_COVER_API;
const UPDATE_PROFILE_API = process.env.NEXT_PUBLIC_UPDATE_PROFILE_API!;

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

export async function uploadCoverImage(userId: number, file: File) {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("No token provided");
  if (!file) throw new Error("No file provided");

  const url = `${UPLOAD_COVER_IMAGE}/${userId}`;
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


export interface UpdateUserProfilePayload {
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  dob?: string;
  address?: string;
  bio?: string;
  chanelName?: string;
}

export async function updateUserProfile(userId: number, payload: UpdateUserProfilePayload) {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("No token provided");

  const url = `${UPDATE_PROFILE_API}/${userId}`;

  try {
    const res = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = res.data;
    if (data.code !== 0 || !data.result) throw new Error("Failed to update profile");
    return data.result;
  } catch (err: any) {
    console.error("❌ updateUserProfile error:", err.response?.data || err.message);
    throw new Error("Failed to update user profile");
  }
}
