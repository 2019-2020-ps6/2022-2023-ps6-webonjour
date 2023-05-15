FROM docker.io/nginx:stable-alpine
COPY  dist/apps/front-end/front-office/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
