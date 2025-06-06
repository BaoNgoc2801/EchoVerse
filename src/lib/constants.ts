import { Stream, User, Conversation, Message } from "./types";

export const USERS: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexgaming",
    imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isLive: true,
    followersCount: 22400,
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "sarahplays",
    imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isLive: true,
    followersCount: 18950,
  },
  {
    id: "3",
    name: "Mike Peterson",
    username: "mikethegamer",
    imageUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isLive: false,
    followersCount: 15300,
  },
  {
    id: "4",
    name: "Emma Watson",
    username: "emmastrategy",
    imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isLive: true,
    followersCount: 31200,
  },
  {
    id: "5",
    name: "David Kim",
    username: "davidtactics",
    imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isLive: false,
    followersCount: 9800,
  },
];

export const STREAMS: Stream[] = [
  {
    id: "101",
    title: "Exploring new forest map! Come join!",
    thumbnailUrl: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewerCount: 1242,
    user: USERS[0],
    isLive: true,
    createdAt: new Date().toISOString(),
    category: "Adventure",
  },
  {
    id: "102",
    title: "Ranked matches with viewers!",
    thumbnailUrl: "https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewerCount: 831,
    user: USERS[1],
    isLive: true,
    createdAt: new Date().toISOString(),
    category: "Competitive",
  },
  {
    id: "103",
    title: "Let's finish the story mode together",
    thumbnailUrl: "https://images.pexels.com/photos/6498294/pexels-photo-6498294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewerCount: 0,
    user: USERS[2],
    isLive: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Story",
  },
  {
    id: "104",
    title: "Speedrunning the new DLC! Can we beat the record?",
    thumbnailUrl: "https://images.pexels.com/photos/7862657/pexels-photo-7862657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewerCount: 2107,
    user: USERS[3],
    isLive: true,
    createdAt: new Date().toISOString(),
    category: "Speedrun",
  },
  {
    id: "105",
    title: "Strategy guide: Tips and tricks for beginners",
    thumbnailUrl: "https://images.pexels.com/photos/6330644/pexels-photo-6330644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    viewerCount: 0,
    user: USERS[4],
    isLive: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Tutorial",
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    participantOne: USERS[0],
    participantTwo: USERS[1],
    lastMessage: {
      content: "Are you streaming today?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    unreadCount: 2,
  },
  {
    id: "conv2",
    participantOne: USERS[0],
    participantTwo: USERS[2],
    lastMessage: {
      content: "Good game yesterday!",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    unreadCount: 0,
  },
  {
    id: "conv3",
    participantOne: USERS[0],
    participantTwo: USERS[3],
    lastMessage: {
      content: "Let's collab on a stream next week",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
    unreadCount: 0,
  },
];

export const MESSAGES: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      content: "Hey, how's it going?",
      senderId: USERS[0].id,
      receiverId: USERS[1].id,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      senderName: USERS[0].name,
      senderImage: USERS[0].imageUrl,
    },
    {
      id: "msg2",
      content: "Good! Just finished a stream",
      senderId: USERS[1].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 82800000).toISOString(),
      senderName: USERS[1].name,
      senderImage: USERS[1].imageUrl,
    },
    {
      id: "msg3",
      content: "How many viewers did you get?",
      senderId: USERS[0].id,
      receiverId: USERS[1].id,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      senderName: USERS[0].name,
      senderImage: USERS[0].imageUrl,
    },
    {
      id: "msg4",
      content: "Around 1k, it was pretty good!",
      senderId: USERS[1].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 3600000 - 10000).toISOString(),
      senderName: USERS[1].name,
      senderImage: USERS[1].imageUrl,
    },
    {
      id: "msg5",
      content: "Are you streaming today?",
      senderId: USERS[1].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      senderName: USERS[1].name,
      senderImage: USERS[1].imageUrl,
    },
  ],
  conv2: [
    {
      id: "msg6",
      content: "That was an awesome play yesterday!",
      senderId: USERS[2].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      senderName: USERS[2].name,
      senderImage: USERS[2].imageUrl,
    },
    {
      id: "msg7",
      content: "Thanks! I got lucky with that last shot",
      senderId: USERS[0].id,
      receiverId: USERS[2].id,
      timestamp: new Date(Date.now() - 86500000).toISOString(),
      senderName: USERS[0].name,
      senderImage: USERS[0].imageUrl,
    },
    {
      id: "msg8",
      content: "Good game yesterday!",
      senderId: USERS[2].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      senderName: USERS[2].name,
      senderImage: USERS[2].imageUrl,
    },
  ],
  conv3: [
    {
      id: "msg9",
      content: "Hey, I've been watching your streams lately",
      senderId: USERS[3].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      senderName: USERS[3].name,
      senderImage: USERS[3].imageUrl,
    },
    {
      id: "msg10",
      content: "Thanks! I appreciate the support",
      senderId: USERS[0].id,
      receiverId: USERS[3].id,
      timestamp: new Date(Date.now() - 172900000).toISOString(),
      senderName: USERS[0].name,
      senderImage: USERS[0].imageUrl,
    },
    {
      id: "msg11",
      content: "Let's collab on a stream next week",
      senderId: USERS[3].id,
      receiverId: USERS[0].id,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      senderName: USERS[3].name,
      senderImage: USERS[3].imageUrl,
    },
  ],
};

export const CURRENT_USER: User = USERS[0];