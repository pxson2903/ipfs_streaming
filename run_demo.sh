# Hello World Program in Bash Shell

echo "shutdown ipfs"


echo "Load demo script"

echo "check ip address from eth1 and upate route"

ipTable=$(ip r | grep "default")
gwTable=$(echo "$ipTable"| grep "eth1")
#echo "$gwTable"
gw=$(echo "$gwTable" |cut -d' ' -f3)

echo "$gw"


#ip route add default via "$gw" dev eth1

echo "start Alrogand and connect to testnet"

goal node start -d ~/node/testnetdata

sleep 3

echo "check Algorand status"
goal node status -d ~/node/testnetdata

sleep 3

echo "start web demo"

pm2 start /home/admin/Downloads/ipfs_streaming/server.js

echo "start ipfs daemon"
ipfs daemon
