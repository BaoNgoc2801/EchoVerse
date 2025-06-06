// src/app/home/page.tsx
import { HomeActions } from "@/components/livestream/home-actions";
import { Container, Flex, Link, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
            <Container size="2">
                <Flex direction="column" align="center" gap="6">
                    <Image
                        src="/wordmark.svg"
                        alt="EchoVerse"
                        width={220}
                        height={80}
                        className="invert dark:invert-0 my-6"
                    />

                    <Text as="p" size="4" align="center">
                        Welcome to <strong>EchoVerse</strong> livestream platform powered by LiveKit.
                        Create your own room, go live, or join others’ streams.
                    </Text>

                    <HomeActions />

                    <Separator orientation="horizontal" size="4" className="my-4" />

                    <Text as="p" size="2" align="center">
                        Built with ❤️ using{" "}
                        <Link href="https://livekit.io/cloud" target="_blank">
                            LiveKit Cloud
                        </Link>. View the source code on{" "}
                        <Link
                            href="https://github.com/livekit-examples/livestream"
                            target="_blank"
                        >
                            GitHub
                        </Link>.
                    </Text>
                </Flex>
            </Container>
        </main>
    );
}
