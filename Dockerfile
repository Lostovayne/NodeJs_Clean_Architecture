# Dockerfile for Node.js + TypeScript app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock* tsconfig.json ./

# Instala curl y bash necesarios para instalar Bun
RUN apk add --no-cache curl bash

# Instala Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun

RUN bun  install 

# Copy the rest of the app
COPY . .

# Build TypeScript
RUN bun run build

# Expose port (default 3000, can be overridden by env)
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]
