import { HomeActions } from "@/components/livestream/home-actions";
import { Container, Flex, Kbd, Link, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
            <Container size="3" className="pt-16 pb-24">
                <Flex direction="column" gap="6" align="center">
                    {/* Header with Logo */}
                    <div className="relative w-32 h-32 mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full opacity-20 blur-xl" />
                        <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-r from-green-500 to-emerald-700 rounded-full shadow-lg">
                            <Text as="h1" className="font-bold text-3xl text-white">EV</Text>
                        </div>
                    </div>

                    {/* Main Title */}
                    <Text as="h1" size="8" weight="bold" className="text-center bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
                        Welcome to EchoVerse
                    </Text>

                    {/* Description with styled elements */}
                    <div className="max-w-lg text-center">
                        <Text as="p" size="4" className="text-green-800">
                            Join or start your own livestream experience in our interactive community.
                        </Text>

                    </div>

                    {/* Separator with custom styling */}
                    <div className="w-full max-w-md my-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent" />
                    </div>

                    {/* Action buttons */}
                    <div className="w-full max-w-md">
                        <HomeActions />
                    </div>

                    {/* Keyboard shortcut info */}
                    <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-white bg-opacity-60 rounded-lg shadow-sm border border-green-200">
                        <Text size="2" className="text-green-700">
                            Bored of the current color theme? Switch it up by pressing
                        </Text>
                        <Kbd>⌘</Kbd>
                        <Kbd>C</Kbd>
                    </div>

                    {/*/!* Footer *!/*/}
                    {/*<div className="mt-12 pt-6 border-t border-green-200 w-full max-w-md">*/}
                    {/*    <Text size="1" className="text-center text-green-600">*/}
                    {/*        © 2025 EchoVerse • Connect • Create • Communicate*/}
                    {/*    </Text>*/}
                    {/*</div>*/}
                </Flex>
            </Container>
        </div>
    );
}