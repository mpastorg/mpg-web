# build vue application stage
FROM node:16-alpine as build-pre-stage
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run pre


# build react stage
# build stage

RUN mkdir /app2

WORKDIR /app2

RUN apk update
RUN apk add git

RUN git clone https://github.com/mpastorg/react-activity /app2

RUN npm install

RUN npm run build



# deployment vue stage
FROM nginx:stable-alpine as pre-stage
COPY nginx/default.conf /etc/nginx/conf.d/
COPY cert/api_madastur_com.crt /etc/nginx/
COPY cert/api_madastur_com.key /etc/nginx/
COPY --from=build-pre-stage /app/dist /usr/share/nginx/html/


# deploy react-application here 
RUN mkdir /usr/share/nginx/html/react/
COPY --from=build-pre-stage /app2/build /usr/share/nginx/html/react/

# end
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
