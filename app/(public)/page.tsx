"use client";
import { authClient } from "@/lib/auth-client";
import Loading from "../loading";
import { Header } from "./_components/header";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="items-center justify-items-center min-h-screen">
      <Header />
      <main className="flex flex-col row-start-2 items-center sm:items-start mt-5">
        <p className="text-3xl">Hello, Welcome to the Education CMS <strong>{session?.user?.name}</strong></p>
      </main>
    </div>
  );
}
