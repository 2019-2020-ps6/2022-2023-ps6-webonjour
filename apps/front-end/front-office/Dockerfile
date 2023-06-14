FROM nginxinc/nginx-unprivileged:stable-alpine

COPY dist/apps/front-end/front-office/* /usr/share/nginx/html/
COPY apps/front-end/front-office/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
