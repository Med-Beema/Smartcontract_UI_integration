import React from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";


/*
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import PolicyHolderForm from "./components/policyholderform/PolicyHolderForm";
import Policyholder  from "./artifacts/contracts/Policyholder.sol/Policyholder.json";
import Deposit from "./components/deposit/deposit";
import Details from "./components/Details/detail"
import { useState } from 'react';
import { ethers } from 'ethers';
*/

 




function App() {

  /*
    const [ipfsHash, setIpfsHash] = useState();
    const [approve, setApprove] = useState();
  const tokenContractAddress= "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const insuranceSystemContractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function depositCoverFees(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({provider});
      const contract = new ethers.Contract(contractAddress, Policyholder.abi, signer);
      console.log({provider});
      const coverFees = await contract.coverFees();
      console.log('coverFees ', coverFees);
      console.log('ipfs', ipfsHash);
      const transaction = await contract.depositCoverFees(ipfsHash,{value: coverFees});
      
      await transaction.wait();
      fetchData();
    }
  }

    async function fetchData(){
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({provider});
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Policyholder.abi, provider);
        const address = signer.getAddress();
        console.log("address: ", address);
        try {          
          const fetchApprovalTransaction = await contract.approvedHolders(address);
          console.log('approval : ', fetchApprovalTransaction);
          setApprove(fetchApprovalTransaction.toString());
        } catch (err) {
          console.log("Error: ", err)
        }
         try {
          const fetchIpfsHashTransaction = await contract.holdersIpfsHash(address);
          console.log('ipfs : ', fetchIpfsHashTransaction);
          setIpfsHash(fetchIpfsHashTransaction);
        } catch (err) {
           console.log("Error: ", err)
        }
        
      } 
    }

*/





  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
      

      
      
    </div>
  );
}

export default App;
