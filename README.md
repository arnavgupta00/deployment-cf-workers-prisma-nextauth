# Next.js Application on Cloudflare Workers with Prisma Accelerate and NextAuth.js

This repository contains a Next.js application configured for deployment on Cloudflare Workers. It integrates Prisma Accelerate for efficient database interactions and NextAuth.js for authentication, utilizing the Web Crypto API to ensure compatibility with the Cloudflare Workers environment.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Next.js Framework**: Utilizes Next.js for server-side rendering and static site generation.
- **Cloudflare Workers Deployment**: Deployed on Cloudflare Workers for edge computing benefits.
- **Prisma Accelerate**: Implements Prisma Accelerate for optimized database performance.
- **NextAuth.js**: Provides authentication mechanisms, adapted to use the Web Crypto API for compatibility with Cloudflare Workers.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) for Cloudflare Workers deployment
- Access to a PostgreSQL database

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/arnavgupta00/deployment-example-cloudflare-workers-prisma-nextAuth
   cd deployment-example-cloudflare-workers-prisma-nextAuth
   ```

2. **Install Dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Configuration

1. **Environment Variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL="your-prisma-accelerate-database-connection-string"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="your-website-link"
   ```

   - `DATABASE_URL`: Your Prisma Accelerate connection string.
   - `NEXTAUTH_SECRET`: A secret key for NextAuth.js.
   - `NEXTAUTH_URL`: Your Website Link.

2. **Prisma Configuration**:

   Ensure your `prisma/schema.prisma` file is configured with the appropriate datasource:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider        = "prisma-client-js"
   
   }

   // Define your data models here
   ```

   Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

3. **NextAuth.js Configuration**:

   Configure NextAuth.js to use the Web Crypto API for JWT encoding and decoding to ensure compatibility with Cloudflare Workers. In your NextAuth.js configuration file:

   ```javascript
   import NextAuth from "next-auth";
   import CredentialsProvider from "next-auth/providers/credentials";
   import { encode, decode } from "@/lib/webcrypto"; // Custom encode/decode functions
   import prisma from "@/lib/db";

   export default NextAuth({
     providers: [
       CredentialsProvider({
         name: "Credentials",
         credentials: {
           username: { label: "Email", type: "text" },
           password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
           if (!credentials) return null;

           const user = await prisma.user.findUnique({
             where: { email: credentials.username },
           });

           if (user && user.password === credentials.password) {
             return { id: user.id.toString(), name: user.name, email: user.email };
           }

           return null;
         },
       }),
     ],
     secret: process.env.NEXTAUTH_SECRET,
     session: {
       strategy: "jwt",
     },
     jwt: {
       encode,
       decode,
     },
   });
   ```

   The `encode` and `decode` functions in `@/lib/webcrypto` should utilize the Web Crypto API to handle JWT operations, ensuring compatibility with the Cloudflare Workers environment.

### Running the Application

To run the application locally:

```bash
npm run dev
```

Or with Yarn:

```bash
yarn dev
```

Access the application at `http://localhost:3000`.

## Deployment

To deploy the application to Cloudflare Workers:

1. **Authenticate with Cloudflare**:

   ```bash
   wrangler login
   ```

2. **Configure Wrangler**:

   Refer `example.wrangler.json`

3. **Publish the Application**:

   ```bash
   wrangler publish
   ```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Prisma Accelerate](https://www.prisma.io/docs/concepts/components/prisma-accelerate)
- [NextAuth.js](https://next-auth.js.org/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
