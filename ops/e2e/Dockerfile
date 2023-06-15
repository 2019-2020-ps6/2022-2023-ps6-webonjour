FROM mcr.microsoft.com/playwright:bionic
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npx prisma generate
COPY ops/e2e/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]
