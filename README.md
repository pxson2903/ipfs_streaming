# Video streaming on IPFS

## Installation


#### Install Nodejs
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
# Close and reopen terminal
sudo apt install nodejs
nvm install 8.10.0
nvm use 8.10.0
```

#### Install Nginx
```
sudo apt-get update
sudo apt-get install nginx
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
# Detail: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04
```

#### Setup SSL
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com
sudo nano /etc/nginx/sites-available/example.com

# Find the existing server_name line and replace _ by with your domain name:
# server_name example.com www.example.com;

sudo systemctl reload nginx

# Setup SSL

sudo certbot --nginx -d example.com -d www.example.com

# If that's successful, certbot will ask how you'd like to configure your HTTPS settings select option 2: 

# Verifying Certbot Auto-Renewal
sudo certbot renew --dry-run

# Detail: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04
```

#### Install ffmeg
~~~~
sudo add-apt-repository ppa:jonathonf/ffmpeg-4
sudo apt-get update
sudo apt-get install ffmpeg
# Detail: https://tecadmin.net/install-ffmpeg-on-linux/
~~~~
###  Install ipfs   
- https://ipfs.io/docs/install/
- Init & run daemon 

#### Config ipfs gateway
- Open file ~/.ipfs/config
- Go to Addresses, change port gateway to 8088

#### Setup demo project 
git clone https://github.com/pxson2903/ipfs_streaming
cd ipfs_streaming
npm install
npm start

#### Reconfigure nginx to be accessible from the Internet
Go to folder ipfs_streaming/nginx
Open file nginx.conf, replace ipfs-demo.tk by your domain name 
Open file sudo nano /etc/nginx/sites-available/example.com
Delete all current content, and paste content in file nginx.conf into it
Restart nginx service
```
# ipfs_streaming/nginx/nginx.conf
server {

  # root /var/www/html;
  # index index.html index.htm index.nginx-debian.html;
  server_name www.ipfs-demo.tk ipfs-demo.tk; # managed by Certbot

  root /root/ipfs_streaming/src;

  location / {
    #try_files $uri $uri/ =404;
    proxy_pass http://127.0.0.1:3000;
  }

  location /ipfs {
    proxy_pass http://127.0.0.1:8080/ipfs;
  }

  location /ipns {
    proxy_pass http://127.0.0.1:8080/ipns;
  }

  location /demo {
    proxy_pass http://127.0.0.1:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/ipfs-demo.tk/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/ipfs-demo.tk/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.ipfs-demo.tk) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = ipfs-demo.tk) {
      return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80 ;
    listen [::]:80 ;
    server_name www.ipfs-demo.tk ipfs-demo.tk;
    return 404; # managed by Certbot
}
```

# DONE
Now got the your link https://example.com/demo to see your website