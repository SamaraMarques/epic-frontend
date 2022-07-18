# Imagem de Origem
FROM node:latest

COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build 

CMD ["yarn", "start"]