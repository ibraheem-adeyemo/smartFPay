FROM node:10 as build-deps
WORKDIR /usr/src/a
COPY package.json /usr/src/app

RUN npm --proxy http://172.25.30.117:6060 install

COPY . /usr/src/app

RUN npm run build

FROM nginx:1.12-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"] 
