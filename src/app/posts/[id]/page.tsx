import { getPostById } from "@/lib/function";

type Props = {
  params: {
    id: string;
  };
};

export default async function SinglePostPage({ params }: Props) {
  const { id } = params;
  const post = await getPostById(id);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
