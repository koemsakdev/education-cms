"use client";
import Loading from "./loading";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <p className="text-3xl">Hello, Welcome to the Education CMS <strong>{session?.user?.name}</strong></p>
      </main>
    </div>
  );
}
