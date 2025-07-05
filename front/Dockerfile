# Stage 1: Build Angular app
FROM node:20-alpine AS build

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration $NODE_ENV

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Clean default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy app from build stage
COPY --from=build /app/dist/abubakkar-apps /usr/share/nginx/html

# Fix permissions to avoid 403 Forbidden
RUN chmod -R 755 /usr/share/nginx/html

# Optionally, set ownership to nginx user (id 101)
RUN chown -R nginx:nginx /usr/share/nginx/html

# Copy custom config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
