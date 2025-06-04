"use client";
import React, { useEffect, useRef, useState } from "react";
import { connectWebSocket, sendMessage, disconnectWebSocket } from "@/services/webSocketClient";
import { fetchMessages, fetchConversations,  fetchContacts } from "@/services/chat-api";
import { fetchUserProfile } from "@/services/profile-api";

interface ChatMessage {
  senderId: number;
  receiverId: number;
  content: string;
  messageType: string;
}

const Chat: React.FC = () => {
  const [senderId, setSenderId] = useState<number | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverAvatar, setReceiverAvatar] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<Record<number, { chanelName: string; avatar: string | null }>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const profile = await fetchUserProfile();
        setSenderId(profile.id);

        const [convoList, contactList] = await Promise.all([
          fetchConversations(profile.id),
          fetchContacts(),
        ]);

        const contactMap: Record<number, { chanelName: string; avatar: string | null }> = {};
        contactList.forEach((c) => (contactMap[c.userId] = { chanelName: c.chanelName, avatar: c.avatar }));
        setContacts(contactMap);

        setConversations(convoList);

        if (convoList.length > 0) {
          loadConversation(convoList[0], profile.id, contactMap);
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

  const loadConversation = async (conversation: any, userId = senderId, contactMap = contacts) => {
    const otherId = conversation.userOneId === userId ? conversation.userTwoId : conversation.userOneId;
    setCurrentConversationId(conversation.conversationId);
    setReceiverId(otherId);
    setReceiverName(contactMap[otherId]?.chanelName || `User ${otherId}`);
    setReceiverAvatar(contactMap[otherId]?.avatar || null);

    const msgs = await fetchMessages(conversation.conversationId);
    setMessages(
        msgs.map((m) => ({
          senderId: m.senderId,
          receiverId: m.receiverId,
          content: m.message,
          messageType: m.messageType,
        })).reverse()
    );
  };

  const handleSend = () => {
    if (!inputMessage.trim() || senderId === null || receiverId === null || currentConversationId === null) return;
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

  if (senderId === null) {
    return <div className="text-white p-10">Loading chat...</div>;
  }

  return (
      <div className="flex h-screen">
        <div className="w-1/4 bg-black/30 border-r border-emerald-500/20 overflow-y-auto">
          <div className="p-4 text-white text-xl font-bold border-b border-emerald-500/20">Conversations</div>
          {conversations.map((convo) => {
            const otherId = convo.userOneId === senderId ? convo.userTwoId : convo.userOneId;
            const contact = contacts[otherId];
            return (
                <button
                    key={convo.conversationId}
                    onClick={() => loadConversation(convo)}
                    className={`w-full text-left px-4 py-3 hover:bg-emerald-800/30 transition ${
                        convo.conversationId === currentConversationId ? 'bg-emerald-600/20' : ''
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {contact?.avatar ? (
                        <img src={contact.avatar} alt={contact.chanelName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">💬</div>
                    )}
                    <div className="text-white">{contact?.chanelName || `User ${otherId}`}</div>
                  </div>
                </button>
            );
          })}
        </div>

        <div className="flex-1 flex flex-col bg-gradient-to-br from-black via-emerald-900 to-black">
          <div className="border-b border-emerald-400/20 px-6 py-4 flex items-center space-x-3">
            {receiverAvatar ? (
                <img src={receiverAvatar} alt={receiverName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💬</span>
                </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-white">{receiverName}</h1>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto" ref={messageListRef}>
            <ul className="space-y-4">
              {messages.map((m, idx) => {
                const isMe = m.senderId === senderId;
                return (
                    <li key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div
                          className={`px-4 py-2 rounded-2xl shadow ${
                              isMe
                                  ? "bg-green-600 text-white rounded-br-md"
                                  : "bg-white/10 text-white border border-emerald-500/20 rounded-bl-md"
                          }`}
                      >
                        {m.content}
                      </div>
                    </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-emerald-400/20 p-6 bg-black/20">
            <div className="flex items-end space-x-4">
              <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-6 py-4 bg-black/30 backdrop-blur-sm border border-emerald-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                  onClick={handleSend}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-emerald-600 to-green-700 hover:scale-105 disabled:opacity-50 px-6 py-3 rounded-2xl text-white font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Chat;
