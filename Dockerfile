FROM node:alpine

RUN mkdir -p /home/backend

COPY ./ /home/backend

COPY .env /home/backend/.env

WORKDIR /home/backend

RUN npm install

CMD [ "node", "server.js"]