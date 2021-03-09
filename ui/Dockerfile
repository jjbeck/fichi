from node as builder

workdir /ui

copy . .

run npm install

run npm build

from nginx

copy --from=builder /ui/dist/* /usr/share/nginx/html/

expose 80