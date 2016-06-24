# currency-converter-search
FROM node:6.2

RUN mkdir /src

ADD package.json /src/

WORKDIR /src

RUN npm install

COPY . /src

RUN npm run build

EXPOSE 40001
CMD ["npm", "start"]
