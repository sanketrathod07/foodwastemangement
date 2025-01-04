FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

LABEL org.opencontainers.image.source="https://github.com/emansarahafi/ecoeats"

CMD ["node", "index"]