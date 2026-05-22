# Event Platform API

API NestJS complète pour une plateforme web et mobile de gestion d'événements.

## Installation

```bash
yarn install
cp .env.example .env
yarn prisma:generate
yarn prisma:migrate
yarn start:dev
```

## Documentation

Swagger sera disponible sur `/docs`.

## Modules inclus

Auth, Users, Roles, Permissions, Organizations, Events, Tickets, Orders, Payments, Checkins, Notifications, Reports, Analytics, CMS, Sponsors, Speakers, Sessions, Marketplace, Wallet, Cashless, Certificates, Support, Audit Logs, Settings.


## Swagger Documentation

After starting the API, open one of these URLs:

- `http://localhost:4000/api/docs`
- `http://localhost:4000/api/v1/docs`

The Swagger UI includes JWT Bearer authentication. Click **Authorize** and paste the access token returned by `/api/v1/auth/login`.

Main Swagger setup is located in `src/main.ts`.


## Important Prisma

Si TypeScript affiche `Module "@prisma/client" has no exported member PrismaClient` ou `Property user does not exist on type PrismaService`, cela signifie que Prisma Client n’a pas encore été généré après l’installation ou après une modification du schema.

Exécuter :

```bash
pnpm install
pnpm prisma:generate
pnpm start:dev
```

Pour vérifier le schema :

```bash
pnpm prisma:validate
```
