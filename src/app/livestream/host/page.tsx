import { redirect } from "next/navigation";
import HostStreamPage from "./page.client";

interface PageProps {
  searchParams: {
    username?: string;
    room?: string;
  };
}

export default function HostPage({ searchParams }: PageProps) {
  const { username, room } = searchParams;

  if (!username || !room) {
    redirect("/");
  }

  return <HostStreamPage username={username} room={room} />;
}