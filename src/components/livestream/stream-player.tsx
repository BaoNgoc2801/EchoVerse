"use client";

import { useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { Track } from "livekit-client";
import { ConnectionState } from "livekit-client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { VideoRenderer } from "@livekit/components-react";

interface StreamPlayerProps {
  hostIdentity: string;
  hostName: string;
}

export const StreamPlayer = ({ hostIdentity, hostName }: StreamPlayerProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isConnected = connectionState === ConnectionState.Connected;
  const isConnecting = connectionState === ConnectionState.Connecting;
  const isReconnecting = connectionState === ConnectionState.Reconnecting;

  const videoPublication = participant?.getTrack(Track.Source.Camera);
  const videoTrack = videoPublication?.track;

  const audioPublication = participant?.getTrack(Track.Source.Microphone);
  const audioTrack = audioPublication?.track;

  let content;

  if (!participant && (isConnecting || isReconnecting)) {
    content = (
        <Flex direction="column" align="center" justify="center" gap="3" py="8">
          <Spinner />
          <Text className="text-muted-foreground">
            {isReconnecting ? "Reconnecting..." : "Connecting..."}
          </Text>
        </Flex>
    );
  } else if (!participant) {
    content = (
        <Flex direction="column" align="center" justify="center" gap="3" py="8">
          <Text className="text-muted-foreground">
            Host disconnected
          </Text>
        </Flex>
    );
  } else if (!videoTrack) {
    content = (
        <Flex direction="column" align="center" justify="center" gap="3" py="8">
          <Text className="text-muted-foreground">
            No video available
          </Text>
        </Flex>
    );
  } else {
    content = (
        <VideoRenderer
            track={videoTrack}
            isLocal={false}
            className="w-full h-full object-cover"
        />
    );
  }

  return (
      <Card className="relative w-full h-full rounded-none overflow-hidden">
        {content}
        {audioTrack && (
            <audio
                autoPlay
                ref={(node) => {
                  if (node && audioTrack) {
                    audioTrack.attach(node);
                  }
                }}
            />
        )}
      </Card>
  );
};