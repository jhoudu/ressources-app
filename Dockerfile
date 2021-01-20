FROM node:alpine
WORKDIR /
ADD . .
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start:prod"]