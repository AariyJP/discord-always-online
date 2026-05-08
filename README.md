# discord-always-online

`discord.js-selfbot` でログイン状態を維持するだけのサーバーサイドアプリケーションです。

## 実行

```bash
pnpm install
DISCORD_TOKEN=your_token pnpm start
```

## Docker

```bash
docker build -t discord-always-online .
docker run --rm -e DISCORD_TOKEN=your_token discord-always-online
```
