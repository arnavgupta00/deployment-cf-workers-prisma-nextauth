import { createPost } from "@/lib/function";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreatePostPage() {
  // Define a server action inside your Server Component:
  async function handleCreatePost(formData: FormData) {
    "use server";

    // Extract form values
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;

    // Call your prisma function
    await createPost({ title, content, authorId });

    // Revalidate the posts page so the new post shows up
    revalidatePath("/posts");

    // Optionally, redirect back to the posts list or anywhere else
    redirect("/posts");
  }

  return (
    <div>
      <h1>Create a New Post</h1>
      <form action={handleCreatePost}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" required />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea name="content" required />
        </div>

        <div>
          <label htmlFor="authorId">Author ID:</label>
          <input type="text" name="authorId" required />
        </div>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
