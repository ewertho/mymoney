FROM node:22-bookworm-slim AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY swagger_output.json ./swagger_output.json

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
