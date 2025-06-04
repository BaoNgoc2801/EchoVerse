"use client"
import React, { useEffect, useState } from 'react';
import { connectWebSocket, sendMessage, disconnectWebSocket } from '@/services/webSocketClient';

interface ChatMessage {
  senderId: number;
  receiverId: number;
  content: string;
  messageType: string;
}

const Chat: React.FC = () => {
  const [senderId, setSenderId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [inputSenderId, setInputSenderId] = useState<string>('');
  const [inputReceiverId, setInputReceiverId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (senderId !== null) {
      connectWebSocket(senderId, (msg: ChatMessage) => {
        setMessages(prev => [...prev, msg]);
      });
      setConnected(true);
      return () => {
        disconnectWebSocket();
        setConnected(false);
        setMessages([]);
      };
    }
  }, [senderId]);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    const sId = parseInt(inputSenderId);
    const rId = parseInt(inputReceiverId);
    if (isNaN(sId) || isNaN(rId)) {
      alert('Please enter valid numeric IDs');
      return;
    }
    setSenderId(sId);
    setReceiverId(rId);
  };

  const handleSend = () => {
    if (!inputMessage.trim() || senderId === null || receiverId === null) return;

    const msg: ChatMessage = {
      senderId,
      receiverId,
      content: inputMessage,
      messageType: 'TEXT',
    };

    sendMessage('/app/chat.sendMessage', msg);
    setInputMessage('');
  };

  if (!connected) {
    return (
        <div>
          <h2>Connect to Chat</h2>
          <form onSubmit={handleConnect}>
            <div>
              <label>Your ID: </label>
              <input
                  type="number"
                  value={inputSenderId}
                  onChange={(e) => setInputSenderId(e.target.value)}
                  required
              />
            </div>
            <div>
              <label>Receiver ID: </label>
              <input
                  type="number"
                  value={inputReceiverId}
                  onChange={(e) => setInputReceiverId(e.target.value)}
                  required
              />
            </div>
            <button type="submit">Connect</button>
          </form>
        </div>
    );
  }

  return (
      <div>
        <h2>WebSocket Chat</h2>
        <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((m, idx) => (
              <li key={idx}>
                <strong>{m.senderId === senderId ? 'You' : `User ${m.senderId}`}</strong>: {m.content}
              </li>
          ))}
        </ul>
        <input
            type="text"
            placeholder="Type message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
  );
};

export default Chat;
