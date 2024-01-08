# Dockerfile for universalresolver/driver-did-key

FROM node:20.10.0-alpine3.18
MAINTAINER Markus Sabadello <markus@danubetech.com>

# build driver-did-key

WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules/
RUN npm install

# done

EXPOSE 8080

CMD [ "node", "index.cjs" ]
