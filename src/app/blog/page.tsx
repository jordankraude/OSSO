import { Blog } from "@/types/blog";
import mockBlogData from "../../data/mockBlogData";
import Image from "next/image";
import HeaderWithSession from "@/components/header-w-session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Footer from '@/components/footer';

export default async function BlogPage() {
  const blogs = Array.isArray(mockBlogData) ? mockBlogData : [mockBlogData]; // Wrap single object in array
  const Session = await getServerSession(authOptions);

  return (
    <div>
      <HeaderWithSession session={Session} />
      <div className="min-h-screen bg-gray-50 p-8 text-black">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: Blog) => (
            <div key={blog.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
              <div className="relative w-full h-60">
                <Image
                  src={blog.coverPhoto || "/placeholder.webp"}
                  alt={`${blog.title} cover`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 text-gray-600">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
