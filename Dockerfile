# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Vite → dist/spa
ARG VITE_BACKOFFICE_API_URL
ENV VITE_BACKOFFICE_API_URL=$VITE_BACKOFFICE_API_URL
RUN npm run build


# ===== PRODUCTION STAGE =====
FROM nginx:alpine

# Copy hasil build
COPY --from=builder /app/dist/spa /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]