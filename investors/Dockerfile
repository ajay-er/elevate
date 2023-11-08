FROM node:20-alpine
WORKDIR /app 
COPY package.json .
RUN npm install -g npm@10.2.3
RUN npm install
COPY . .
CMD [ "npm","start" ]