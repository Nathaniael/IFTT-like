FROM node:lts-alpine3.14 AS development
WORKDIR /app
COPY package*.json ./

RUN npm install

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
CMD ["npm", "run", "start:prod"]
