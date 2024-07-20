# Stage 1: Build the application
FROM node:19.5.0-alpine as build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

CMD [ "npm", "run", "preview", "--", "--port", "80" ]