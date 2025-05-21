import { AccessToken } from "livekit-server-sdk";

export interface CreateStreamResponse {
  roomName: string;
  hostIdentity: string;
  auth_token: string;
  connection_details: {
    token: string;
  };
}

export interface JoinStreamResponse {
  auth_token: string;
  connection_details: {
    token: string;
  };
}

export const createAuthToken = (identity: string) => {
  // In a real app, you would implement a secure auth token
  return Buffer.from(`auth_${identity}_${Date.now()}`).toString("base64");
};

export const createStreamToken = (roomName: string, identity: string, isHost: boolean) => {
  try {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error("LiveKit API credentials not found");
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
      name: identity,
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: isHost,
      canPublishData: true,
      canSubscribe: true,
    });

    return token.toJwt();
  } catch (error) {
    console.error("Error creating stream token:", error);
    throw error;
  }
};