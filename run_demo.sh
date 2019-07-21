# Hello World Program in Bash Shell

echo "Load demo script"

echo "check ip address from eth1 and upate route"

ip=$(ip -f inet -o addr show eth0|cut -d\  -f 7 | cut -d/ -f 1)
echo "$ip"

#ip route add default via "$ip" dev eth1

echo "start Alrogand and connect to testnet"

#goal node start -d ~/node/testnetdata

echo "check Algorand status"
#goal node status -d ~/node/testnetdata

echo "start web demo"

pm2 start /home/admin/Downloads/ipfs_streaming/server.js

echo "start ipfs daemon"
ipfs daemon
