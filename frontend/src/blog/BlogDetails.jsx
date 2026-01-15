import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Blog not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-20">Loading blog...</p>;
  }

  if (!blog) {
    return (
      <div className="text-center py-14">
        <p>Blog not found</p>
        <Link to="/blog" className="underline text-green-600">
          Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10 px-6 bg-[#f9faf7]">
      <div className="mx-auto">

        <Link to="/blog" className="text-green-700 font-semibold">
          ← Back to Blog
        </Link>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[420px] object-cover rounded-3xl mt-6"
        />

        <div className="-mt-20 bg-white rounded-3xl p-8 md:p-12 relative">
          <h1 className="text-3xl md:text-4xl font-bold">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Published on {new Date(blog.date).toDateString()}
          </p>

          <div className="prose prose-lg max-w-none mt-6"
               dangerouslySetInnerHTML={{ __html: blog.content }}>
          </div>
        </div>
      </div>
    </section>
  );
}
