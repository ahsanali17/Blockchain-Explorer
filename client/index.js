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
  let html = "";  
  html += `<p> Latest Block Hash: ${latestBlock.hash}</p>` 
  + `<p> Latest Block Miner: ${latestBlock.miner}</p>` 
  + `<p> Latest Block Number: ${latestBlock.number}</p>`;
  // This is what sets the innerHTML to html for block-information div
  document.getElementById("block-information").innerHTML = html;
});