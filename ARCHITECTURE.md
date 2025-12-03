# Project Architecture & Logic Documentation

## 1. Project Overview
This project is a **Next.js 16** blog application that allows users to view blog posts and authenticated users to create and manage their own posts. It leverages **Server Components (RSC)** and **Server Actions** for a modern, efficient architecture.

## 2. Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [Kinde Auth](https://kinde.com/)
- **UI Components**: Shadcn/ui (Radix UI + Tailwind)

## 3. Database Schema
The application uses a relational database with a single primary model defined in `prisma/schema.prisma`.

### `BlogPost` Model
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary Key |
| `title` | String | Title of the blog post |
| `content` | String | Main content of the post |
| `imageUrl` | String | URL of the post's cover image |
| `authorId` | String | ID of the user who created the post (from Kinde) |
| `authorName` | String | Name of the author |
| `authorImage` | String | Profile image URL of the author |
| `createdAt` | DateTime | Timestamp of creation (default: now) |
| `updatedAt` | DateTime | Timestamp of last update |

## 4. Authentication & Authorization
Authentication is handled by **Kinde Auth**.
- **Middleware** (`middleware.ts`): Protects all routes by default, except for public paths (like the home page `/`).
- **Session Management**: `getKindeServerSession()` is used in Server Components and Server Actions to retrieve the current user's session and details.

## 5. Application Architecture (App Router)

### Directory Structure
- **`app/`**: Contains the application routes and pages.
  - **`page.tsx`**: Public landing page. Fetches and displays all blog posts.
  - **`dashboard/`**: Protected area for authenticated users.
    - **`page.tsx`**: Displays posts created by the *current* user.
    - **`create/page.tsx`**: Form to create a new blog post.
  - **`api/`**: API routes (e.g., for Kinde auth).
  - **`actions.ts`**: Server Actions for form submissions.
- **`components/`**: Reusable UI components (e.g., `BlogpostCard`, `SubmitButton`, `NavBar`).
- **`prisma/`**: Database schema and configuration.

## 6. Key Workflows & Logic

### A. Viewing the Blog Feed (Public)
1.  **Route**: `/` (`app/page.tsx`)
2.  **Logic**:
    -   The page is a **Server Component**.
    -   It calls `getData()` which runs a Prisma query: `prisma.blogPost.findMany()`.
    -   Data is fetched directly on the server and passed to the `BlogpostCard` components.
    -   **Suspense** is used to show a loading skeleton (`BlogPostsGrid`) while data is being fetched.

### B. User Dashboard (Protected)
1.  **Route**: `/dashboard` (`app/dashboard/page.tsx`)
2.  **Logic**:
    -   Protected by Middleware.
    -   Retrieves the current user's ID using `getKindeServerSession()`.
    -   Fetches posts *only* where `authorId` matches the logged-in user.
    -   Displays the user's posts with options to manage them (currently listing).

### C. Creating a Blog Post
1.  **Route**: `/dashboard/create` (`app/dashboard/create/page.tsx`)
2.  **Form Submission**:
    -   The form uses a **Server Action** `handleSubmission` (imported from `app/actions.ts`).
    -   **`handleSubmission` Logic**:
        1.  Checks if the user is authenticated. If not, redirects to login.
        2.  Extracts `title`, `content`, and `url` (image) from the `FormData`.
        3.  Uses `prisma.blogPost.create()` to insert the new record, including the author's details from the session.
        4.  Calls `revalidatePath("/")` to ensure the public feed updates immediately.
        5.  Redirects the user back to `/dashboard`.

## 7. Data Flow Diagram
```mermaid
graph TD
    User[User] -->|Visits /| HomePage[Home Page (Server Component)]
    HomePage -->|Prisma Query| DB[(PostgreSQL)]
    DB -->|Return Posts| HomePage
    HomePage -->|Render| UI[Browser UI]

    User -->|Visits /dashboard| Dashboard[Dashboard (Server Component)]
    Dashboard -->|Get Session| Auth[Kinde Auth]
    Dashboard -->|Prisma Query (where authorId=user)| DB
    
    User -->|Submits Form| ServerAction[handleSubmission (Server Action)]
    ServerAction -->|Check Auth| Auth
    ServerAction -->|Create Post| DB
    ServerAction -->|Revalidate /| Cache[Next.js Cache]
    ServerAction -->|Redirect| Dashboard
```
