# discord-always-online

`discord.js-selfbot` で複数アカウントへログインし、ログイン状態を維持するだけのサーバーサイドアプリケーションです。

## 実行

```bash
pnpm install
DISCORD_TOKENS=token_1,token_2 pnpm start
```

## Docker

```bash
docker build -t discord-always-online .
docker run --rm -e DISCORD_TOKENS=token_1,token_2 discord-always-online
```
