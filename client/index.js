import "./index.scss";
import axios from "axios";
const ethers = require('ethers');
const server = "http://localhost:3043";

document.getElementById("public-address").addEventListener('input', async ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }
  
  const response = await axios.get(`${server}/balance/${value}`);
  let balance = ethers.utils.formatEther(response.data["balance"]["hex"]);
  console.log(balance);
  document.getElementById("balance").innerHTML = balance;
  
});

document.getElementById("get-latest").addEventListener('click', async () => {
  const response = await axios.get(`${server}/block/`);
  const latestBlock = response.data.latestBlock;
  console.log(latestBlock);
  
  let html = "";  
  html += `<p> Latest Block Hash: ${latestBlock.hash}</p>` 
  + `<p> Latest Block Miner: ${latestBlock.miner}</p>` 
  + `<p> Latest Block Number: ${latestBlock.number}</p>`;
  document.getElementById("block-information").innerHTML = html;
});