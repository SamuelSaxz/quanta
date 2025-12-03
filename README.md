# quanta

To install dependencies:

```bash
bun install
```

To run (client):

```bash
bun expo start --tunnel
```

To run (server):

```bash
bun run dev
```

## Deve ser configurado dois .env no diretório:

- apps/client/.env
- .env

no apps/client/.env deve ser configurado:

```
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_ACCESS_TTL=
```

no .env deve ser configurado:

```
NODE_ENV=
DATABASE_URL=
ACCESS_TTL=
REFRESH_TTL=
JWT_SECRET=
NGROK_TOKEN=
```

No momento não está funcionando o server em loclahost, mas em ngrok funciona se configurado no .env
e descomentado o código no apps/server/src/index.ts

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

```

```
