export type User = {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  isLive?: boolean;
  followersCount: number;
};

export type Stream = {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewerCount: number;
  user: User;
  isLive: boolean;
  createdAt: string;
  category: string;
};

export type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  senderName: string;
  senderImage: string;
};

export type Conversation = {
  id: string;
  participantOne: User;
  participantTwo: User;
  lastMessage?: {
    content: string;
    timestamp: string;
  };
  unreadCount?: number;
};