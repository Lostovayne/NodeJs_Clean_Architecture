# Dockerfile for Node.js + TypeScript app
FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package.json bun.lock* tsconfig.json ./

RUN apk add --no-cache curl bash

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
CMD ["bun", "dist/index.js"]
