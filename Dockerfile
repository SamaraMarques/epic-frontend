# Imagem de Origem
FROM node:latest

COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn global add next 
RUN yarn global add react 
RUN yarn global add react-dom 
RUN yarn build 


CMD ["yarn", "start"]