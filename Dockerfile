FROM node:20-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install

COPY . .

ARG VITE_BACKOFFICE_API_URL
ENV VITE_BACKOFFICE_API_URL=$VITE_BACKOFFICE_API_URL

RUN pnpm build


FROM nginx:alpine

COPY --from=build /app/dist/spa /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]