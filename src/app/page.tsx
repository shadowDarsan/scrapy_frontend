import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex min-h-screen flex-col items-center justify-center ">
        {session?.user?.name ? (
          <>{`Welcome, ${session?.user?.name}!`}</>
        ) : (
          <div className="flex items-center gap-x-2">
            <p>You are not logged in yet</p>
            <span className="text-sm underline">
              <Link href="/api/auth/signin">Login</Link>
            </span>
          </div>
        )}
        <div className="w-full max-w-md rounded-md p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-semibold">Scrappy</h1>
          <p className="mb-6 text-gray-600">Your go-to web scraping tool</p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Features</h2>
            <ul className="list-inside list-disc">
              <li>Easy keyword-based scraping</li>
              <li>Location-specific data extraction</li>
              <li>Customizable and user-friendly</li>
            </ul>
          </section>

          <section className="text-center">
            <h2 className="mb-4 text-2xl font-semibold">Get Started</h2>
            <p className="mb-6 text-gray-600">
              Start scraping valuable data with Scrappy today!
            </p>

            <Link
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              href={"/scrape"}
            >
              Scrape Now
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
