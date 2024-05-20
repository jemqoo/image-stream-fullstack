FROM node:18.15-alpine

WORKDIR /dist

COPY package*.json ./

COPY init-db.sql /docker-entrypoint-initdb.d/

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start"]