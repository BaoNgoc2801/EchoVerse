"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Flex, Button } from "@radix-ui/themes";

interface ReactionBarProps {
  hostIdentity: string;
  isHost: boolean;
  viewerIdentity: string;
}

const reactions = [
  {
    value: "❤️",
    label: "heart",
  },
  {
    value: "👍",
    label: "thumbs up",
  },
  {
    value: "😂",
    label: "laugh",
  },
  {
    value: "🎉",
    label: "celebrate",
  },
  {
    value: "👏",
    label: "clap",
  },
];

export const ReactionBar = ({
                              hostIdentity,
                              isHost,
                              viewerIdentity,
                            }: ReactionBarProps) => {
  const [selectedReaction, setSelectedReaction] = useState("");

  const handleReactionClick = (reaction: string) => {
    setSelectedReaction(reaction);

    // You can implement WebSocket or LiveKit DataPublish to send reactions
    setTimeout(() => {
      setSelectedReaction("");
    }, 1000);
  };

  return (
      <Flex justify="between" className={cn("p-3", isHost && "hidden")}>
        <Flex gap="2">
          {reactions.map((reaction) => (
              <Button
                  key={reaction.value}
                  variant="ghost"
                  className={cn(
                      "h-8 w-8 rounded-full",
                      selectedReaction === reaction.value && "bg-accent"
                  )}
                  onClick={() => handleReactionClick(reaction.value)}
              >
                {reaction.value}
              </Button>
          ))}
        </Flex>
      </Flex>
  );
};