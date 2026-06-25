# HoogleDrive

A full-stack file storage and management web application — a simplified clone of Google Drive. Users sign up, create folders, upload/download files, and manage their data through a clean dashboard interface.

## Demo

<img width="1920" height="970" alt="folders_screen" src="https://github.com/user-attachments/assets/2e2288f9-1d90-441d-b7a9-852dc5d6be04" />
<img width="1920" height="970" alt="home_screen" src="https://github.com/user-attachments/assets/61ea2af2-352e-48ca-9a0c-9bd9608ae53f" />
<img width="1920" height="970" alt="signup_screen" src="https://github.com/user-attachments/assets/001929ac-d24f-4af2-b10a-f8663b83ba71" />
<img width="1920" height="970" alt="upload_files_screen" src="https://github.com/user-attachments/assets/0a962cc0-45ff-43d8-993c-cbb87bccf470" />

## Tech Stack

| Category         | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| **Runtime**      | Node.js (TypeScript, ESM)                               |
| **Framework**    | Express 5                                               |
| **Templating**   | EJS                                                     |
| **Database**     | PostgreSQL via Prisma ORM                               |
| **File Storage** | Supabase Storage                                        |
| **Auth**         | Passport.js (local strategy), bcryptjs, express-session |
| **Styling**      | Tailwind CSS 4                                          |
| **Validation**   | express-validator                                       |
| **File Upload**  | multer (in-memory)                                      |

## Architecture

- **PostgreSQL** stores all metadata — users, folders, files, and session data — via Prisma ORM.
- **Supabase Storage** holds the actual file blobs, accessed via a REST client.
- **Express 5** handles routing with a controller/view pattern. EJS templates render server-side HTML.
- **Passport.js** with a local strategy manages authentication; sessions persist in PostgreSQL via `prisma-session-store`.
- **Tailwind CSS** (v4 CLI) provides utility-based styling with a glassmorphism design.

This follows the same architectural pattern as Google Drive: a relational database for metadata and object storage for file content.

## Features

- **User authentication** — signup, login, logout with bcrypt-hashed passwords
- **Folder CRUD** — create, list, and delete folders (unique per user)
- **File CRUD** — upload (via multer → Supabase), list, download, and delete files
- **Dashboard** — shows total folder and file counts for the logged-in user
- **All files view** — browse every uploaded file across all folders in one place
- **UUID-based storage paths** — prevents filename collisions in blob storage
- **Cascading deletes** — removing a user or folder cleans up associated files
- **Session-backed auth** — 7-day cookie sessions persisted in PostgreSQL

## Getting Started

```bash
npm run build     # install deps, generate Prisma client, compile Tailwind, transpile TS
npm run dev       # transpile and run (tsc && node dist/app.mjs)
npm start         # production entry point
```

Requires a PostgreSQL database (e.g., Neon) and a Supabase project with a bucket named `HoogleDrive`. Set `DATABASE_URL`, `SUPABASE_URL`, and `SUPABASE_KEY` in the environment.

## Project Structure

```
src/
  app.mts              # Express app entry point
  auth/                # Passport strategy + auth middleware
  controller/          # Route handlers (business logic)
  router/              # URL routing
  views/               # EJS templates
  lib/                 # Prisma + Supabase client singletons
prisma/
  schema.prisma        # Database schema + relations
public/                # Compiled CSS, static assets
```

## Design Decisions

- **Hybrid storage**: metadata in PostgreSQL, file blobs in Supabase Storage — mirrors production cloud storage architecture
- **In-memory uploads**: multer's `memoryStorage()` buffers files in RAM before pushing to Supabase, avoiding temp file I/O
- **Prisma session store**: sessions live in the same PostgreSQL database, eliminating the need for Redis
- **Unique constraints**: folders are unique per `(userId, name)` and files per `(folderId, name)`, preventing duplicates within the same scope
- **TypeScript throughout**: full type safety with Prisma-generated types and Express type augmentation

## What This Demonstrates

- Full-stack TypeScript development with Express
- ORM-based database design and migration management (Prisma)
- Authentication and session management with Passport.js
- Cloud blob storage integration (Supabase)
- Server-rendered UI with a modern CSS framework (Tailwind)
- RESTful API design patterns (routes, controllers, middleware)
