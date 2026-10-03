# Node 24 executa TypeScript direto (type stripping): não há etapa de build.
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
USER node
EXPOSE 4007
CMD ["node", "src/server.ts"]
