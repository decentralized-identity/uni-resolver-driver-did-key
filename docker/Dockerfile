# Dockerfile for universalresolver/driver-did-key

FROM node:14-alpine
MAINTAINER Markus Sabadello <markus@danubetech.com>

# build driver-did-key

WORKDIR /usr/src/app
COPY . .
RUN npm install

# done

EXPOSE 8080

CMD [ "node", "index.js" ]
