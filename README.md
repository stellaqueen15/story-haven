# StoryHaven

StoryHaven est une application de gestion de communautés de jeu de rôle, d’univers, de personnages et de récits. Ce dépôt contient le site web et son API dans deux applications indépendantes.

## Technologies

- **Site web :** Next.js, React et TypeScript
- **API :** NestJS et TypeScript
- **ORM :** Prisma
- **Base de données :** PostgreSQL
- **Environnement local :** Docker Compose et Caddy

## Démarrage rapide

### Prérequis

- Docker Desktop avec Docker Compose activé
- Un port local 80 libre
- Windows, macOS ou Linux

### 1. Récupérer le dépôt

```bash
git clone https://github.com/stellaqueen15/story-haven.git
cd story-haven
```

### 2. Associer le nom local

Pour ouvrir le site avec `http://storyhaven.local`, ajoutez cette ligne au fichier `hosts` de votre ordinateur :

```text
127.0.0.1 storyhaven.local
```

Sous Windows, le fichier se trouve dans `C:\Windows\System32\drivers\etc\hosts` et doit être modifié avec les droits administrateur. Sur macOS et Linux, il se trouve dans `/etc/hosts`.

Si le port 80 est déjà utilisé, lancez Compose avec un autre port, par exemple `HTTP_PORT=8080 docker compose up --build` (PowerShell : `$env:HTTP_PORT=8080; docker compose up --build`), puis ouvrez `http://storyhaven.local:8080`.

### 3. Construire et démarrer les services

À la racine du dépôt :

```bash
docker compose up --build
```

Au premier démarrage, Docker construit le site et l’API, crée la base PostgreSQL, applique les migrations Prisma et démarre les services. Ouvrez ensuite **http://storyhaven.local**.

La base PostgreSQL de cette nouvelle version démarre vide. Les comptes de l’ancienne base MySQL/Laravel ne sont pas importés automatiquement.

Pour arrêter les services, utilisez `Ctrl+C`, puis :

```bash
docker compose down
```

Les données de la base restent dans le volume Docker `postgres_data`. Pour repartir avec une base vide, supprimez ce volume avec `docker compose down --volumes`.

## Fonctionnalités du compte

- Création d’un compte avec nom, adresse e-mail et mot de passe
- Connexion et déconnexion
- Affichage du compte connecté
- Modification du nom et de l’adresse e-mail
- Modification du mot de passe après vérification de l’ancien

L’API est accessible sur le même domaine sous `/api`. Les mots de passe sont hachés et l’authentification utilise un cookie HttpOnly.

## Développement de l’API sans Docker

Le Docker Compose du dépôt reste la manière recommandée de lancer tout le projet. Pour travailler directement sur l’API, installez Node.js 22 ou supérieur et PostgreSQL, puis :

```bash
cd backend
npm install
```

Copiez `backend/.env.example` vers `backend/.env`, ajustez `DATABASE_URL` et `JWT_SECRET`, puis lancez :

```bash
npx prisma migrate dev
npm run start:dev
```

L’API écoute sur `http://localhost:3001/api`. Pour l’interface en mode développement, ouvrez un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

Le site Next.js écoute sur `http://localhost:3000`. Pour que le navigateur puisse appeler l’API directement en dehors de Compose, définissez `NEXT_PUBLIC_API_URL=http://localhost:3001/api` dans `frontend/.env.local`.

## Organisation du dépôt

```text
story-haven/
├── backend/       # API NestJS, Prisma et migrations PostgreSQL
├── frontend/      # Application Next.js
├── Caddyfile      # Routage du domaine local vers le site et l’API
└── compose.yaml   # Site, API, base de données et proxy local
```