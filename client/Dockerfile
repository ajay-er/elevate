FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@latest
RUN npm install -g @angular/cli@6.2.9
RUN npm install
COPY . .
RUN ng build

FROM nginx:alpine
COPY --from=builder /app/dist/client/browser /usr/share/nginx/html
COPY static.conf /etc/nginx/conf.d/default.conf
