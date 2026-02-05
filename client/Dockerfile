# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG REACT_APP_API_KEY
ARG REACT_APP_AUTH_DOMAIN
ARG REACT_APP_PROJECT_ID
ARG REACT_APP_STORAGE_BUCKET
ARG REACT_APP_MESSAGING_SENDER_ID
ARG REACT_APP_APP_ID
ARG REACT_APP_MEASUREMENT_ID
ARG REACT_APP_BACKEND_SERVER
ARG REACT_APP_ADMIN
ARG REACT_APP_GOOGLE_API_KEY

RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
