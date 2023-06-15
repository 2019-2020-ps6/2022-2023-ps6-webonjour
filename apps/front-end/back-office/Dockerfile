FROM node:20.3.0-alpine3.18 as builder

WORKDIR /app

COPY package.json .
RUN apk add --no-cache binutils-gold g++ gcc gnupg libgcc linux-headers make python3
RUN npm i

COPY . .

RUN npx prisma generate

# set env variables
ARG SECURE
ENV SECURE=$SECURE
ARG FRONT_OFFICE_DOMAIN
ENV FRONT_OFFICE_DOMAIN=$FRONT_OFFICE_DOMAIN
ARG BACK_OFFICE_DOMAIN
ENV BACK_OFFICE_DOMAIN=$BACK_OFFICE_DOMAIN
ARG API_DOMAIN
ENV API_DOMAIN=$API_DOMAIN

# replace urls in the environment.prod.ts file
RUN sed -i "s|api.webonjour.ozeliurs.com|$API_DOMAIN|g" libs/shared/environments/src/lib/environment.prod.ts
RUN sed -i "s|front.webonjour.ozeliurs.com|$FRONT_OFFICE_DOMAIN|g" libs/shared/environments/src/lib/environment.prod.ts
RUN sed -i "s|back.webonjour.ozeliurs.com|$BACK_OFFICE_DOMAIN|g" libs/shared/environments/src/lib/environment.prod.ts
RUN sed -i "s|secure: true|secure: $SECURE|g" libs/shared/environments/src/lib/environment.prod.ts

RUN npx nx run front-end-back-office:build:production

# =========== Final Image ===========
FROM nginxinc/nginx-unprivileged:stable-alpine

COPY  --from=builder /app/dist/apps/front-end/back-office /usr/share/nginx/html/
COPY apps/front-end/back-office/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
