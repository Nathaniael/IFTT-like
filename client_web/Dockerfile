FROM node:16-alpine3.14 as build
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npm run build

FROM nginx:alpine
USER root
COPY --from=build /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d
RUN chown www-data:www-data /var/www
RUN chmod 744 /var/www
RUN chown www-data:www-data /usr/share/nginx/html
RUN chmod 744 /usr/share/nginx/html

EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]