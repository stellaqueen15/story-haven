# StoryHaven API

API REST construite avec NestJS, Prisma et PostgreSQL. L’API expose l’inscription, la connexion, la déconnexion, la lecture du compte courant et la modification des informations du compte.

## Lancer l’API en local

1. Installer Node.js 22+ et PostgreSQL.
2. Copier `.env.example` vers `.env` et configurer `DATABASE_URL` et un secret aléatoire pour `JWT_SECRET`.
3. Installer et démarrer :

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

L’API écoute sur le port 3001, avec les routes sous `/api`. Pour lancer toute l’application avec Docker, suivez les instructions du [README principal](../README.md).

## Structure

- `src/auth/` gère l’inscription, la connexion et la session JWT dans un cookie HttpOnly.
- `src/users/` gère le profil et le changement de mot de passe.
- `src/prisma/` fournit le client Prisma partagé.
- `prisma/schema.prisma` décrit la base de données ; `prisma/migrations/` conserve son historique de changements.

Après une modification de `schema.prisma`, créez une migration avec `npx prisma migrate dev --name nom-du-changement`.
