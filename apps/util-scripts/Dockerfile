FROM node:18.12.1-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npx nx build util-scripts


FROM node:18.12.1-alpine  as runner

WORKDIR /app
COPY --from=builder /app/dist/apps/util-scripts /app
COPY apps/util-scripts/entrypoint.sh /app

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm i --ignore-scripts
RUN npx prisma generate --generator client
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
