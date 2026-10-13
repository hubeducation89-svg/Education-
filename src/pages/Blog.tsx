import { BLOG_POSTS } from "../data";
import { SEO } from "../components/SEO";

export function Blog() {
  return (
    <div className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen pb-24 md:pb-16">
      <SEO title="Blog" />
      <div className="text-center mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f2147] mb-2 sm:mb-4">Latest Articles</h1>
        <p className="text-xs sm:text-lg text-gray-600">
          Insights, tips, and career advice for students and professionals.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {BLOG_POSTS.map((post, index) => (
          <article key={post.id} className="bg-white p-5 sm:p-8 rounded-2xl shadow-xs border border-gray-100 hover:border-indigo-100 transition-colors">
            <div className="text-sm text-indigo-600 font-medium mb-2">Blog {index + 1}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors cursor-pointer">
              {post.title}
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              {post.summary}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <time>{post.date}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
