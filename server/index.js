const express = require('express');
const app = express();
const cors = require('cors');
const port = 3043;
const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const provider = new ethers.providers.StaticJsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

// Get the Balance of the inputted address
app.get('/balance/:address', async (req, res) => {
  const {address} = req.params;
  const balance = await provider.getBalance(address);
  console.log(balance);
  res.send({ balance });
});

// Get latest ETH Block
app.get('/block/', async (req, res) => {
  const latestBlock = await provider.getBlock('latest');
  console.log("Latest Block is:" + latestBlock);
  res.send({ latestBlock });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});