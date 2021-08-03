# Dockerfile for universalresolver/driver-did-key

FROM node:10-alpine
MAINTAINER Markus Sabadello <markus@danubetech.com>

# build driver-did-key

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

# done

EXPOSE 8080

CMD [ "node", "index.js" ]
