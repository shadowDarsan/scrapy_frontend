import { CreatPost } from "@/app/_components/create-post";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

export default async function page() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex w-full justify-center p-20">
        <h1 className="text-3xl font-bold">Scrape</h1>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-5">
        <CreatPost />
      </div>
    </main>
  );
}
