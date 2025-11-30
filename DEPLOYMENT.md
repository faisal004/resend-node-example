# Digital Ocean Deployment Guide

## Step 1: Update Server Code

Make sure your server listens on `0.0.0.0` instead of `localhost` (already fixed in server.ts).

## Step 2: Build the Application

```bash
npm run build
```

## Step 3: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

## Step 4: Start the Server with PM2

```bash
pm2 start ecosystem.config.js
```

Or manually:
```bash
pm2 start dist/server.js --name resend-email-server
```

## Step 5: Save PM2 Configuration

```bash
pm2 save
pm2 startup
```

## Step 6: Configure Firewall (UFW)

```bash
# Allow SSH (if not already allowed)
sudo ufw allow 22/tcp

# Allow your application port
sudo ufw allow 3001/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

## Step 7: Set Up Nginx Reverse Proxy (Recommended)

Install Nginx:
```bash
sudo apt update
sudo apt install nginx
```

Create Nginx config:
```bash
sudo nano /etc/nginx/sites-available/resend-server
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/resend-server /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Allow HTTP/HTTPS:
```bash
sudo ufw allow 'Nginx Full'
```

## Step 8: Environment Variables

Make sure your `.env` file is set up on the server:
```bash
nano .env
```

Add:
```
RESEND_API_KEY_1=your_key_1
RESEND_API_KEY_2=your_key_2
FROM_EMAIL_1=Kramaankh <noreply@kramaankh.com>
FROM_EMAIL_2=UICraft <noreply@uicraft.in>
PORT=3001
```

## Step 9: Verify Server is Running

Check PM2 status:
```bash
pm2 status
pm2 logs resend-email-server
```

Test locally on server:
```bash
curl http://localhost:3001/health
```

Test from external:
```bash
curl http://YOUR_DROPLET_IP:3001/health
```

## Troubleshooting

### Check if server is running:
```bash
pm2 list
pm2 logs
```

### Check if port is listening:
```bash
sudo netstat -tlnp | grep 3001
# or
sudo ss -tlnp | grep 3001
```

### Restart server:
```bash
pm2 restart resend-email-server
```

### Check firewall:
```bash
sudo ufw status verbose
```

### Check Nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

