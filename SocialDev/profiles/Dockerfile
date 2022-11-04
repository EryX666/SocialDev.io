FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install -g npm@latest
RUN npm install --only=prod
COPY . .

EXPOSE 8443
EXPOSE 3000

CMD ["npm", "start"]