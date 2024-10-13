FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
# Nginx port
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
