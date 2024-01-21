import { unstable_noStore as noStore } from "next/cache";

import { CreatPost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <div className="w-full max-w-xs">
      <CreatPost />
    </div>
  );
}
