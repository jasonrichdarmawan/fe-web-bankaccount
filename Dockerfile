FROM node:14-alpine3.12 as build
WORKDIR /app
COPY .env.development ./.env
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
COPY . ./
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY cert.pem privkey.pem /etc/nginx/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]