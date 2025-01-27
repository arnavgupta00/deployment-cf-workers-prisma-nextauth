import prisma from "./db";

export async function getPosts() {
  return await prisma.post.findMany({
    cacheStrategy: {
      ttl: 5, // Cache is considered fresh for 5 seconds
      swr: 10, // Serve stale data for up to 10 seconds while revalidating
    },
  });
}

export async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

export async function createPost(data: {
  title: string;
  content: string;
  authorId: string;
}) {
  const { authorId, ...postData } = data;
  const newpost = await prisma.post.create({
    data: {
      ...postData,
      author: {
        connect: { id: authorId },
      },
    },
  });

  return newpost;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return await prisma.user.create({
    data,
  });
}
