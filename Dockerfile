FROM  node:16-alpine3.16 as angular

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM httpd:alpine3.16

WORKDIR /usr/local/apache2/htdocs/

COPY --from=angular /app/dist/sae-5.a-edt-front .