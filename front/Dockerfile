# Stage 1: build Angular app
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm ci && npx ng build --configuration production

# Stage 2: serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
