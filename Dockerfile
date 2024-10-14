FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./

ARG REACT_APP_BACKEND_URL
ARG REACT_APP_GOOGLE_MAPS_API_KEY
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_GOOGLE_MAPS_API_KEY=$REACT_APP_GOOGLE_MAPS_API_KEY

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
# Nginx port
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
