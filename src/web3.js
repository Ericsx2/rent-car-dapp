import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

window.ethereum.request({ method: 'eth_requestAccounts' });

export default web3;
