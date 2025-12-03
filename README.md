# 🚀 Next.js Modern Blog Starter

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)

A modern, high-performance blog application built with the latest web technologies. Designed for speed, scalability, and developer experience.

## ✨ Features

- **⚡ Next.js 16 App Router**: Leveraging the latest React Server Components and server actions.
- **🎨 Tailwind CSS v4**: Next-gen styling with the latest Tailwind features.
- **🗄️ Prisma & PostgreSQL**: Robust database management and type-safe ORM.
- **🔐 Kinde Authentication**: Secure and easy-to-implement user authentication.
- **🧩 Radix UI & Lucide Icons**: Accessible, unstyled components and beautiful icons.
- **💎 Modern UI/UX**: Clean, responsive, and accessible design.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Auth**: [Kinde](https://kinde.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)

## 🚀 Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/nextjsproject.git
    cd nextjsproject
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

    # Kinde Auth
    KINDE_CLIENT_ID=your_client_id
    KINDE_CLIENT_SECRET=your_client_secret
    KINDE_ISSUER_URL=your_issuer_url
    KINDE_SITE_URL=http://localhost:3000
    KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
    KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
    ```

4.  **Initialize the Database:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI components
├── lib/                # Utility functions and shared logic
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── ...

---

Built with ❤️ using Next.js
