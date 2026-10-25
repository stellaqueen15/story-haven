# StoryHaven backend

The backend is a NestJS REST API using Prisma and PostgreSQL. The frontend is a separate Next.js app.

## Local development

Use Node.js 22 or newer and Docker Desktop. From the repository root, run `docker compose up --build`. The first run installs dependencies, applies Prisma migrations and starts the frontend and API.

- Web app: http://storyhaven.local (or http://localhost:3000)
- API: http://storyhaven.local/api

To use the `.local` address, add `127.0.0.1 storyhaven.local` to your operating system hosts file. Docker Compose binds the reverse proxy to port 80; if another service already uses that port, stop it or change the `80:80` mapping in `compose.yaml`.

## Backend commands

From `backend/`:

- `npm run start:dev` starts the API in watch mode.
- `npx prisma migrate dev --name describe-change` creates and applies a database migration.
- `npx prisma studio` opens Prisma Studio.

Set `DATABASE_URL` in `backend/.env` when running the API outside Docker. In Compose, the API reads the database connection from the `db` service.
