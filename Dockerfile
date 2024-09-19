
FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:alpine AS prod
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 8000
CMD [ "npm", "run", "start:prod" ]
