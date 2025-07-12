# DigitalOcean Deployment Guide

## Prerequisites

1. **DigitalOcean Account**: Create an account at digitalocean.com
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Domain Name** (optional): For custom domain

## Step-by-Step Deployment

### 0. Check Image Size Locally (Optional)

Before deploying, you can check your Docker image size:

```bash
# On Linux/Mac
chmod +x scripts/build-and-check.sh
./scripts/build-and-check.sh

# On Windows
scripts\build-and-check.bat
```

Expected image size: **~150MB** (well under the 500MB limit)

### 1. Create DigitalOcean Container Registry

```bash
# Create a container registry
doctl registry create your-registry-name --region nyc3
```

### 2. Create a Droplet (VPS)

1. Go to DigitalOcean Dashboard
2. Create Droplet → Choose Ubuntu 22.04
3. Select plan (Basic $4/month is enough for testing)
4. Add SSH key or use password
5. Choose datacenter region

### 3. Setup GitHub Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions:

```
DIGITALOCEAN_ACCESS_TOKEN=your_do_token
DROPLET_IP=your_droplet_ip
DROPLET_USERNAME=root
DROPLET_SSH_KEY=your_private_ssh_key
```

### 4. Configure Droplet

SSH into your droplet and run:

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose-plugin -y

# Install doctl (DigitalOcean CLI)
cd ~
wget https://github.com/digitalocean/doctl/releases/download/v1.94.0/doctl-1.94.0-linux-amd64.tar.gz
tar xf ~/doctl-1.94.0-linux-amd64.tar.gz
sudo mv ~/doctl /usr/local/bin

# Create environment file
nano ~/.env
```

### 5. Environment Variables (.env file on server)

```env
NODE_ENV=production
PORT=3000
MONGO_URL=mongodb://mongo-user:123456@localhost:27017/your-database?authSource=admin

# Add your other environment variables here
JWT_SECRET=your-jwt-secret
BCRYPT_ROUNDS=10
```

### 6. Setup MongoDB on Droplet

```bash
# Create docker-compose file for MongoDB
nano ~/docker-compose.yml
```

Content:

```yaml
version: "3.8"
services:
  mongo-db:
    image: mongo:6.0.6
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongo-user
      MONGO_INITDB_ROOT_PASSWORD: 123456
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo_data:
```

Start MongoDB:

```bash
docker compose up -d
```

### 7. Deploy

1. Push your code to GitHub main branch
2. GitHub Actions will automatically:
   - Build Docker image
   - Push to DigitalOcean Container Registry
   - Deploy to your Droplet

### 8. Setup Domain (Optional)

1. Point your domain to Droplet IP
2. Update nginx.conf with your domain
3. Setup SSL with Let's Encrypt:

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Alternative: DigitalOcean App Platform

For easier deployment without managing servers:

1. Go to DigitalOcean → App Platform
2. Connect your GitHub repository
3. DigitalOcean will detect your Dockerfile
4. Add environment variables
5. Add MongoDB database component
6. Deploy!

## Costs Estimation

- **Droplet**: $4-6/month (Basic plan)
- **Container Registry**: $5/month (500MB storage)
- **Managed Database**: $15/month (Basic MongoDB)
- **App Platform**: $5/month per component

**Total**: ~$10-26/month depending on approach

## Monitoring

Add health checks and monitoring:

```bash
# Install monitoring tools
docker run -d --name=netdata --restart=always -p 19999:19999 netdata/netdata
```

Access monitoring at: http://your-ip:19999

## Image Size Optimization Tips

Your current setup should produce ~150MB images. If you need to optimize further:

### 1. Use Alpine-based Node.js (already implemented)

```dockerfile
FROM node:20-alpine  # ~40MB vs node:20 ~400MB
```

### 2. Multi-stage builds (already implemented)

- Build stage: Installs all dependencies
- Production stage: Only runtime dependencies

### 3. Remove unnecessary files

```dockerfile
# Already in Dockerfile.prod
RUN rm -rf src && \
    rm -rf node_modules && \
    bun install --production
```

### 4. Use .dockerignore

Create `.dockerignore`:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
```

### 5. Optimize dependencies

```bash
# Check for unnecessary dependencies
npm ls --depth=0
npx depcheck
```

### Current size breakdown:

- Alpine Linux: ~5MB
- Node.js runtime: ~35MB
- Bun runtime: ~30MB
- Your app + dependencies: ~80MB
- **Total: ~150MB** ✅ (70% under limit)
