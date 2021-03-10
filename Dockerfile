FROM node:10 as build-deps
WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm --proxy http://172.16.10.20:8080 install

COPY . /usr/src/app

RUN npm run build

FROM nginx:1.12-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
