"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@livekit/components-react";
import { Card, Flex, Text, ScrollArea, Avatar, Box, TextField, Button } from "@radix-ui/themes";
import { PersonIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useToken } from "./token-context";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isHost: boolean;
}

export const Chat = ({ hostName, hostIdentity, viewerName, isHost }: ChatProps) => {
  const { authToken } = useToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const {
    chatMessages: messages,
    isSending,
    send,
  } = useChat();

  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [sortedMessages.length]);

  const onSubmit = () => {
    if (!message.trim()) return;

    send(message);
    setMessage("");
  };

  return (
      <Card className="h-full flex flex-col">
        <Flex direction="column" p="3" gap="2" style={{ height: "100%" }}>
          <Text weight="bold">Stream Chat</Text>
          <ScrollArea style={{ flex: 1 }} ref={containerRef}>
            <Flex direction="column" gap="2">
              {sortedMessages.map((message) => {
                const isHost = message.from?.identity === hostIdentity;
                return (
                    <Flex key={message.timestamp} gap="2" align="start">
                      <Avatar
                          size="1"
                          fallback={<PersonIcon />}
                          color={isHost ? "red" : "blue"}
                      />
                      <Box>
                        <Text size="1" weight={isHost ? "bold" : "regular"}>
                          {isHost ? hostName : message.from?.identity}
                        </Text>
                        <Text size="2">{message.message}</Text>
                      </Box>
                    </Flex>
                );
              })}
            </Flex>
          </ScrollArea>
          <Flex gap="2" mt="auto">
            <TextField.Root style={{ flex: 1 }}>
              <TextField.Input
                  placeholder="Send a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      onSubmit();
                    }
                  }}
              />
            </TextField.Root>
            <Button disabled={!message || isSending} onClick={onSubmit}>
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Flex>
      </Card>
  );
};