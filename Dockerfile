

FROM node:14-alpine
WORKDIR /portfolio-monitor
COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV "production"

EXPOSE 3000

CMD ["npx", "serve", "build"]

