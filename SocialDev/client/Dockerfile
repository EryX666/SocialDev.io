FROM node:alpine
LABEL org.opencontainers.image.source https://github.com/omer-bar/SocialDev.io


WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]