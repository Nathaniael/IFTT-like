FROM node:lts-alpine3.14 AS development
WORKDIR /app
COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3 && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3
# RUN npm install
# RUN npm audit fix --force
# RUN npm install bcrypt

COPY . .
RUN chown -R root /app/dist
RUN chown -R root ~/.npm
RUN chown -R root /usr/local/lib/node_modules
RUN npm run build

FROM node:lts-alpine3.14 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main"]