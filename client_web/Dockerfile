FROM node:16-alpine3.14 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . /app
RUN mv /app/public/app-release.apk /app/public/client.apk
RUN npm run build
RUN npm install -g serve
EXPOSE 8081
CMD ["serve", "-s", "build"]