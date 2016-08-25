FROM node:5

COPY package.json /src/package.json
RUN cd /src && npm install
COPY . /src

WORKDIR /src

RUN npm install -g forever

CMD NODE_ENV=${ENV_NAME} forever --uid express-microservice-starter -a index.js
