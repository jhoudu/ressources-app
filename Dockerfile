FROM node:alpine
RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
## De fonctionne pas car razzle est dans les devts dépendencies
## RUN npm install --production
RUN npm install

## De même cette ligne est après l'install pour razzle
ENV NODE_ENV production

COPY src ./src
COPY public ./public
COPY README.md ./README.md

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]