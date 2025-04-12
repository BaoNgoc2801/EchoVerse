type User = {
    id: string;
    username: string;
    avatar: string;
    isStreaming: boolean;
};

const generateMockUserData = (): User[] => {
    return [
        {
            id: "user1",
            username: "Streamer_One",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            isStreaming: true,
        },
        {
            id: "user2",
            username: "Streamer_Two",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            isStreaming: false,
        },
        {
            id: "user3",
            username: "Streamer_Three",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            isStreaming: true,
        },
        {
            id: "user4",
            username: "Streamer_Four",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            isStreaming: false,
        },
    ];
};

export { generateMockUserData };
