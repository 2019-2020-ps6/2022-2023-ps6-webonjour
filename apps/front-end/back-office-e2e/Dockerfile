FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npx prisma generate

CMD [ "npx", "nx", "run", "front-end-cross-office-e2e:e2e:docker"]
