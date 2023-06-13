FROM node:18-alpine

WORKDIR /app/workdir/src

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]