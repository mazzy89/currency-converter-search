# currency-converter-search
FROM node:6.2

RUN mkdir /src

ADD package.json /src/

WORKDIR /src

RUN npm run deploy

COPY . /src

CMD ["npm", "start"]
