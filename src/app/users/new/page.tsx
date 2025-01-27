import { createUser } from "@/lib/function";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateUserPage() {
  // Server action for creating a user
  async function handleCreateUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await createUser({ name, email, password });

    // Revalidate or redirect as needed
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h1>Create a New User</h1>
      <form action={handleCreateUser}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
