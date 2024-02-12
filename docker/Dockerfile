# Dockerfile for universalresolver/driver-did-key

FROM node:20.10.0-alpine3.18
MAINTAINER Markus Sabadello <markus@danubetech.com>

# build driver-did-key

WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules/
RUN npm install
RUN find ./ -name "*.js" -type f -exec sed -i -e "s/'did:key:zUC7': bls12381,/'did:key:zUC7': bls12381,'did:key:z3tE': bls12381,/g" {} \;
RUN find ./ -name "*.ts" -type f -exec sed -i -e "s/'did:key:zUC7': typeof bls12381;/'did:key:zUC7': typeof bls12381;'did:key:z3tE': typeof bls12381;/g" {} \;

# done

EXPOSE 8080

CMD [ "node", "index.cjs" ]
