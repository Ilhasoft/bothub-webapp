FROM nginx

COPY . .

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
