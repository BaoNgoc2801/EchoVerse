import { redirect } from "next/navigation";
import HostPageImpl from "./page.client";

interface PageProps {
  searchParams: {
    at: string | undefined;
    rt: string | undefined;
  };
}

export default async function HostPage({
                                         searchParams: { at, rt },
                                       }: PageProps) {
  console.log("at:", at, "rt:", rt); // Log the values to check if they're valid

  if (!at || !rt) {
    redirect("/");
  }

  const serverUrl = process.env.LIVEKIT_WS_URL!
      .replace("wss://", "https://")
      .replace("ws://", "http://");

  return <HostPageImpl authToken={at} roomToken={rt} serverUrl={serverUrl} />;
}
