# currency-converter-search
FROM node:6.2

RUN mkdir /src

ADD package.json /src/

WORKDIR /src

RUN npm install

COPY . /src

RUN npm run build

CMD ["npm", "start"]
