FROM node:16-alpine3.14 as build
WORKDIR /app
COPY . /app
RUN npm install --silent
# RUN mv /app/public/app-release.apk /app/public/client.apk
RUN npm run build
RUN ls nginx/

FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]