FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npx prisma generate
# replace urls in the environment.prod.ts file
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

RUN npx nx run front-end-front-office:build:production

FROM docker.io/nginx:stable-alpine
COPY  --from=builder /app/dist/apps/front-end/front-office/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
