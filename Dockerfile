FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

FROM gcr.io/distroless/nodejs24-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["dist/index.cjs"]
