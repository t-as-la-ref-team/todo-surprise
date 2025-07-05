# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

# Copy only necessary files first for caching
COPY package*.json angular.json tsconfig*.json ./
COPY src ./src

RUN npm install
RUN npx ng build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/your-app-name /usr/share/nginx/html
