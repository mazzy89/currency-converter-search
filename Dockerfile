# currency-converter-search
FROM node:6.2.1

RUN mkdir /src

ADD package.json /src/

WORKDIR /src

RUN npm deploy

COPY . /src

CMD ["npm", "start"]
