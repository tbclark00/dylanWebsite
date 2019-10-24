FROM node:10.16.3
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 8080