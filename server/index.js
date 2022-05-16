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

// We'll use this server to interact with our provider then once we get the data we need we will pass it to our client who will then pass that info to our front-end

// Get the Balance of the inputted address
app.get('/balance/:address', async (req, res) => {
  const {address} = req.params;
  // Get the balance of the address
  const balance = await provider.getBalance(address);
  console.log(balance);
  // Send response to client 
  res.send({ balance });
});

// Get latest ETH Block
app.get('/block/', async (req, res) => {
  // Here is where we use our provider methods to retrieve information from the ethereum mainnet
  const latestBlock = await provider.getBlock('latest');
  console.log("Latest Block is:" + latestBlock);
  // We send our response to the client
  res.send({ latestBlock });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});