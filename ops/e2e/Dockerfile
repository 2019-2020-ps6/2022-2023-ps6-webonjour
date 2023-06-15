FROM mcr.microsoft.com/playwright:bionic
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

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

RUN npx prisma generate
COPY ops/e2e/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]
