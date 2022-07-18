# Imagem de Origem
FROM node:latest

WORKDIR /app

COPY package.json ./

RUN yarn install 
RUN yarn build 

COPY . .

CMD ["yarn", "start"]