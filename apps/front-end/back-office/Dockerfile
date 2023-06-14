FROM nginxinc/nginx-unprivileged:stable-alpine

COPY dist/apps/front-end/back-office /usr/share/nginx/html/
COPY apps/front-end/back-office/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
