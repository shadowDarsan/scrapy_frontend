import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoLinkedin,
  IoMail,
  IoPhoneLandscape,
  IoLogoTwitter,
} from "react-icons/io5";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.scrape.getHistory.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost.length > 0 ? (
        <>
          {latestPost.map((post) => (
            <>
              <table>
                <tr>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Facebook</th>
                  <th>Instgram</th>
                  <th>Twitter</th>
                  <th>LinkedIn</th>
                </tr>
                <tr>
                  <td>
                    {post.email && (
                      <>
                        <IoMail />
                        {post.email}
                      </>
                    )}
                  </td>
                  <td>
                    {post.phone && (
                      <>
                        <IoPhoneLandscape /> {post.phone}
                      </>
                    )}
                  </td>
                  <td>
                    {post.facebook && (
                      <>
                        <IoLogoFacebook /> {post.facebook}
                      </>
                    )}
                  </td>
                  <td>
                    {post.instagram && (
                      <>
                        <IoLogoInstagram /> {post.instagram}
                      </>
                    )}
                  </td>
                  <td>
                    {post.twitter && (
                      <>
                        <IoLogoTwitter /> {post.instagram}
                      </>
                    )}
                  </td>
                  <td>
                    {post.linkedin && (
                      <>
                        <IoLogoLinkedin /> {post.instagram}
                      </>
                    )}
                  </td>
                  <td>
                    {post.pinterest && (
                      <>
                        <IoLogoPinterest /> {post.pinterest}
                      </>
                    )}
                  </td>
                </tr>
              </table>
            </>
          ))}
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
