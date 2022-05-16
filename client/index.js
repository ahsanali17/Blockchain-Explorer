import "./index.scss";
import axios from "axios";
const ethers = require('ethers');
const server = "http://localhost:3043";

// We'll use our client to handle events and the results. We first get our information from the server index.js and we can manipulate that data further and get that to show in our front-end. 

document.getElementById("public-address").addEventListener('input', async ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }
  
  const response = await axios.get(`${server}/balance/${value}`);
  // We use the ethers library to format the hex value in our response into the amount of ETH in the inputted address
  let balance = ethers.utils.formatEther(response.data["balance"]["hex"]);
  console.log(balance);
  // Here we set the innerHTML of our div with id balance to balance 
  document.getElementById("balance").innerHTML = balance;
  
});

document.getElementById("get-latest").addEventListener('click', async () => {
  // Getting Axios to call the get method of our Block endpoint from our server
  const response = await axios.get(`${server}/block/`);
  // We save our res.send({ latestBlock }) from server into latestBlock so we can use it on the client side
  const latestBlock = response.data.latestBlock;
  console.log(latestBlock);
  
  // String interpolation with block information held within <p> tags so that we can put the html tags into block-information div
  let block_data = {
    "Block Height":latestBlock.number,
    "Timestamp":latestBlock.timestamp,
    "Transactions":latestBlock.transactions.slice(0,1),
    "Mined by":latestBlock.miner,
    "Block Reward":'',
    "Uncles Reward":'',
    "Difficulty":latestBlock.difficulty,
    "Total Difficulty":'',
    "Size":latestBlock.Size,
    "Gas Used":'',
    "Gas Limit":'',
    "Base Fee Per Gas":'',
    "Burnt Fees":'',
    "Extra Data":'',
    "Hash": latestBlock.hash, 
    "Parent Hash":'',
    "Sha3Uncles":latestBlock.Sha3Uncles,
    "StateRoot":latestBlock.StateRoot,
    "Nonce":latestBlock.nonce,
  };  
  // Looking inside our object to check if all the data is there.  
  console.log("block_data:", block_data)
  
  // We use the Object.keys to grab the keys of our block_data object, then we use a reduce function here to iterate through each object return us a div with its key name and key value
  
  // The function was taken from here: https://stackoverflow.com/questions/27266901/display-javascript-object-in-html
  
  const generatedHtml = Object.keys(block_data).reduce((accum, currKey, value) => accum + 
  `
  <div class="block_item>
    <div class="item">${value}. ${currKey}: ${block_data[currKey]}</div>
  </div>
  `,"");
  
  // We pass our generatedHtml to our div id block-information as inner html
  document.getElementById("block-information").innerHTML = generatedHtml;
});