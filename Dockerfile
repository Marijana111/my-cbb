# build env
FROM node:12.2.0-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent && npm config set unsafe-perm true && npm install react-scripts@3.4.1 -g --silent
COPY . /app
RUN npm run build

# production env
FROM nginx:1.19.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
