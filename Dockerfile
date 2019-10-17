FROM node:9
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 8080