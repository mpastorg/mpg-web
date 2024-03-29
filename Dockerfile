# build vue application stage
FROM node:16-alpine as build-pre-stage
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install -g node-pre-gyp
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
RUN apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation fontconfig

RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && npm install canvas --build-from-source\
    && npm install \
    && apk del .gyp
COPY . /app
RUN npm run pre


# build react stage
# build stage

RUN mkdir /app2

WORKDIR /app2

RUN apk update
RUN apk add git

ARG SSH_PRIVATE_KEY

RUN git clone https://mpastorg:$SSH_PRIVATE_KEY@github.com/mpastorg/react-activity /app2

RUN npm install

RUN npm run build



# deployment vue stage
FROM nginx:stable-alpine as pre-stage
RUN mkdir /usr/share/nginx/html/vue/
COPY --from=build-pre-stage /app/dist /usr/share/nginx/html/vue/


# deploy react-application here 
RUN mkdir /usr/share/nginx/html/react/
COPY --from=build-pre-stage /app2/build /usr/share/nginx/html/react/

# end
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
