# build stage
FROM node:lts-alpine as build-pre-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run pre

# production stage
FROM nginx:stable-alpine as pre-stage
COPY nginx/default.conf /etc/nginx/conf.d/
COPY cert/api_madastur_com.crt /etc/nginx/
COPY cert/api_madastur_com.key /etc/nginx/
COPY --from=build-pre-stage /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
