This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Hostinger VPS using MRAN Stack VPS Template in hostinger using github

To install a Next.js app on a MRAN Stack VPS (MongoDB, React, Angular, Node.js) template in Hostinger using GitHub, follow these steps:

Prerequisites:
Hostinger VPS with MRAN stack pre-installed.
GitHub repository containing the Next.js app.
A domain or subdomain setup for your VPS.
Basic understanding of SSH and server management.
Step-by-Step Instructions:
1. Access the VPS via SSH
Open a terminal (or use PuTTY if you're on Windows).
SSH into your Hostinger VPS using the IP address and credentials.
bash
Copy code
ssh root@your_vps_ip
2. Update Packages on the Server
Make sure your server's packages are up-to-date.

bash
Copy code
sudo apt update && sudo apt upgrade -y
3. Install Node.js and npm (if needed)
Since the MRAN stack includes Node.js, verify the installation:

bash
Copy code
node -v
npm -v
If they are not installed, follow the steps to install them:

bash
Copy code
sudo apt install nodejs
sudo apt install npm
4. Install PM2 (Process Manager)
PM2 is a process manager for Node.js apps. It will help you keep the Next.js app running.

bash
Copy code
sudo npm install -g pm2
5. Clone Your GitHub Repository
On your VPS, navigate to the directory where you want to store your Next.js app.

bash
Copy code
cd /var/www
Clone your Next.js GitHub repository:

bash
Copy code
git clone https://github.com/yourusername/your-nextjs-repo.git
cd your-nextjs-repo
6. Install Dependencies
Once inside the cloned directory, install the required dependencies using npm or yarn.

bash
Copy code
npm install
# OR if you are using Yarn
yarn install
7. Build the Next.js App
Build your Next.js app for production:

bash
Copy code
npm run build
8. Start the Next.js App Using PM2
Use PM2 to start the app and ensure it runs as a service.

bash
Copy code
pm2 start npm --name "nextjs-app" -- run start
To ensure the app starts after a server reboot:

bash
Copy code
pm2 save
pm2 startup
9. Set Up Nginx for Reverse Proxy (Optional)
If you want to serve the app via a domain/subdomain, configure Nginx as a reverse proxy.

Install Nginx if it's not installed:

bash
Copy code
sudo apt install nginx
Edit the Nginx configuration for your domain:

bash
Copy code
sudo nano /etc/nginx/sites-available/default
Add the following reverse proxy configuration for your Next.js app:

nginx
Copy code
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
Save and exit (Ctrl + X, then Y, and Enter).

Test the Nginx configuration:

bash
Copy code
sudo nginx -t
Restart Nginx:

bash
Copy code
sudo systemctl restart nginx
10. Point Your Domain to the VPS
Update your domain's DNS settings to point to your VPS IP address. You can do this by:

Logging into your domain registrar's control panel.
Updating the A Record to your VPS's IP address.
11. Secure with SSL (Optional)
To secure the connection with HTTPS, you can use Certbot to get a free SSL certificate from Let's Encrypt.

Install Certbot:

bash
Copy code
sudo apt install certbot python3-certbot-nginx
Get the SSL certificate:

bash
Copy code
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
Certbot will automatically configure SSL for your Nginx server block.

At this point, your Next.js app should be up and running on your Hostinger VPS, accessible via your domain or IP.