FROM node:alpine
LABEL org.opencontainers.image.source https://github.com/omer-bar/SocialDev.io


WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

EXPOSE 8443
EXPOSE 3000

CMD ["npm", "start"]