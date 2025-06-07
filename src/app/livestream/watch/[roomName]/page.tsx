import { redirect } from "next/navigation";
import WatchPageImpl from "./page.client";

interface PageProps {
    params: Promise<{ roomName: string }>; // Thêm Promise để phản ánh params là async
}

export default async function WatchPage({ params }: PageProps) {
    const { roomName } = await params; // Await params để lấy roomName
    if (!roomName) {
        redirect("/");
    }

    const serverUrl = process.env
        .NEXT_PUBLIC_LIVEKIT_WS_URL!.replace("wss://", "https://")
        .replace("ws://", "http://");

    return <WatchPageImpl roomName={roomName} serverUrl={serverUrl} />;
}



