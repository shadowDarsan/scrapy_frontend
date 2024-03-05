/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLink,
} from "react-icons/io5";
import { z } from "zod";
import axios from "axios";
const schema = z.object({
  keyword: z.string().min(1, { message: "Keyword is required" }),
  location: z.string().min(1, { message: "Location is required" }),
});

interface ApiResponseItem {
  email?: string[];
  facebook: string;
  instagram: string;
  linkedin?: string;
  phone_numbers: string[];
  pinterest?: string;
  twitter?: string;
  url: string;
}

interface ApiResponse {
  data: ApiResponseItem[];
}

type FormData = z.infer<typeof schema>;

export function CreatPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      keyword: "",
      location: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<ApiResponse>({ data: [] });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);

    axios
      // .post<ApiResponse>("https://scrapy-6tgl.onrender.com/scrape", {
      .post<ApiResponse>("http://127.0.0.1:5000/scrape", {
        keyword: data.keyword,
        location: data.location,
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPosts({ data: [] });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(posts.data);

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <input
            {...register("keyword")}
            className="input input-bordered rounded-xl bg-white text-black"
            placeholder="Keyword"
          />
          <p>{errors.keyword?.message}</p>

          <input
            {...register("location")}
            className="input input-bordered rounded-xl bg-white text-black"
            placeholder="Location"
          />
          <p>{errors.location?.message}</p>
          <button className="btn btn-ghost bg-slate-600" type="submit">
            Scrape
          </button>
        </form>
      </div>

      <div className="flex w-full max-w-lg flex-row items-center justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {posts?.data.length > 0 ? (
              <table className="table table-zebra">
                <thead>
                  <tr className="text-md text-white">
                    <th>Email</th>
                    <th>Phone Numbers</th>
                    <th>Facebook</th>
                    <th>Instagram</th>
                    <th>Twitter</th>
                    <th>LinkedIn</th>
                    <th>Pinterest</th>
                    <th>Website</th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.data.map((post, index) => (
                    <tr key={index}>
                      <td>{post.email}</td>
                      <td>
                        {post?.phone_numbers?.map((number, i) => (
                          <div key={i}>{number}</div>
                        ))}
                      </td>
                      <td>
                        {post.facebook && (
                          <a href={post.facebook}>
                            <IoLogoFacebook />
                          </a>
                        )}
                      </td>
                      <td>
                        {post.instagram && (
                          <a href={post.instagram}>
                            <IoLogoInstagram />
                          </a>
                        )}
                      </td>
                      <td>
                        {post.twitter && (
                          <a href={post.twitter}>
                            <IoLogoTwitter />
                          </a>
                        )}
                      </td>
                      <td>
                        {post.linkedin && (
                          <a href={post.linkedin}>
                            <IoLogoLinkedin />
                          </a>
                        )}
                      </td>
                      <td>
                        {post.pinterest && (
                          <a href={post.pinterest}>
                            <IoLogoPinterest />
                          </a>
                        )}
                      </td>
                      <td>
                        {post.url && (
                          <a href={post.url}>
                            <IoLink />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No posts found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
