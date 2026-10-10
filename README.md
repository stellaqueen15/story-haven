# 📖 Story Haven

**Story Haven** is a central platform designed to enhance the management of roleplay (RP) communities, lores, characters, and stories. It solves the organization limitations of tools like Discord by providing an intuitive and evolutive space tailored for roleplayers and game masters.

This project is built as a modern, decoupled web application to showcase full-stack development skills, robust database architecture, and software engineering best practices.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** Laravel (API REST, Sanctum Auth)
- **Database & Infra:** MySQL, Docker (Laravel Sail)

---

## 🚀 Architecture & Monorepo Structure

The project is structured as a **monorepo** splitting the concerns cleanly between the API and the User Interface:

```text
story-haven/
├── backend/       # Laravel API (Dockerized container)
└── frontend/      # Next.js App Router (Client Dashboard & Public Pages)
```

---

## 💻 Local Development Setup

Follow these steps to run the complete environment locally.

### Prerequisites

- [Docker Desktop](https://docker.com) (Running with WSL2 engine)
- [Node.js](https://nodejs.org) (v18+ recommended)
- PHP & Composer (for local CLI tooling, optional)

### 1. Clone the repository

```bash
git clone https://github.com/stellaqueen15/story-haven.git
cd story-haven
```

### 2. Backend Setup (Laravel & Docker)

Navigate to the backend folder and initialize the environment variables:

```bash
cd backend
cp .env.example .env
```

Start the Docker containers (Windows PowerShell workaround):

```powershell
$env:WWWUSER=1337; $env:WWWGROUP=1337; docker compose up -d
```

Run the database migrations:

```powershell
docker compose exec laravel.test php artisan migrate
```

The API is now running on `http://localhost`.

### 3. Frontend Setup (Next.js)

Open a new terminal at the root directory, navigate to the frontend folder, and create the environment file:

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost/api" > .env.local
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The frontend dashboard is now accessible at `http://localhost:3000`.
