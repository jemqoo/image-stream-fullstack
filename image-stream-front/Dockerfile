FROM node:20

COPY ["./package.json","./"]

RUN npm install

COPY . .

RUN npm run start

