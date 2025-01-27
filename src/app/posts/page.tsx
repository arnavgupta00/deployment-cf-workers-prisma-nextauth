import { getPosts } from "@/lib/function";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  // Server component fetching data directly
  const posts = await getPosts();

  return (
    <div>
      <h1>All Posts</h1>
      <Link
        href="/posts/new"
        style={{ display: "inline-block", marginBottom: "1rem" }}
      >
        Create New Post
      </Link>

      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}
