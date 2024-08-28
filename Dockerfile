FROM node:20.15.1

WORKDIR /app

COPY package*.json .
RUN npm i

COPY . .

CMD ["npm" ,"run", "dev"]