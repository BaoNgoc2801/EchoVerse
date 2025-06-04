"use client";
import React, { useEffect, useRef, useState } from "react";
import { connectWebSocket, sendMessage, disconnectWebSocket } from "@/services/webSocketClient";
import { fetchMessages, fetchConversations } from "@/services/chat-api";
import { fetchUserProfile } from "@/services/profile-api";

interface ChatMessage {
  senderId: number;
  receiverId: number;
  content: string;
  messageType: string;
}

const Chat: React.FC = () => {
  const [senderId, setSenderId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const profile = await fetchUserProfile();
        setSenderId(profile.id);

        const conversations = await fetchConversations(profile.id);
        if (conversations.length > 0) {
          const firstConversation = conversations[0];
          const otherId =
              firstConversation.userOneId === profile.id
                  ? firstConversation.userTwoId
                  : firstConversation.userOneId;

          setReceiverId(otherId);

          const msgs = await fetchMessages(firstConversation.conversationId);
          setMessages(
              msgs
                  .map((m) => ({
                    senderId: m.senderId,
                    receiverId: m.receiverId,
                    content: m.message,
                    messageType: m.messageType,
                  }))
                  .reverse()
          );
        }
      } catch (err) {
        console.error("❌ Failed to init chat:", err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (senderId !== null) {
      connectWebSocket(senderId, (msg: ChatMessage) => {
        setMessages((prev) => [...prev, msg]);
      });
      return () => {
        disconnectWebSocket();
        setMessages([]);
      };
    }
  }, [senderId]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim() || senderId === null || receiverId === null) return;

    const msg: ChatMessage = {
      senderId,
      receiverId,
      content: inputMessage,
      messageType: "TEXT",
    };

    sendMessage("/app/chat.sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  if (senderId === null || receiverId === null) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-lg">Loading chat...</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">💬 Chat</h2>
        <div className="w-full max-w-xl bg-gray-900 rounded-xl p-4 flex flex-col space-y-4 shadow-lg">
          <ul
              ref={messageListRef}
              className="flex-1 overflow-y-auto space-y-3 max-h-[400px] px-2"
          >
            {messages.map((m, idx) => {
              const isMe = m.senderId === senderId;
              return (
                  <li
                      key={idx}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                        className={`max-w-[75%] px-4 py-2 rounded-xl shadow-md text-sm ${
                            isMe
                                ? "bg-green-600 text-white rounded-br-none"
                                : "bg-gray-700 text-white rounded-bl-none"
                        }`}
                    >
                      <div className="font-semibold mb-1">
                        {isMe ? "You" : `User ${m.senderId}`}
                      </div>
                      <div>{m.content}</div>
                    </div>
                  </li>
              );
            })}
          </ul>
          <div className="flex gap-2">
            <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
            />
            <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>
  );
};

export default Chat;
