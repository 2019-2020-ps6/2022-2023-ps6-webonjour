FROM docker.io/nginx:stable-alpine
COPY  dist/apps/front-end/back-office/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
