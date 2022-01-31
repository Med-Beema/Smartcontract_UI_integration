import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import PolicyHolderForm from "./components/policyholderform/PolicyHolderForm";
import Policyholder  from "./artifacts/contracts/Policyholder.sol/Policyholder.json";
import Deposit from "./components/deposit/deposit";
import { useState } from 'react';
import { ethers } from 'ethers';





function App() {
    const [ipfsHash, setIpfsHash] = useState();
  const contractAddress= "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
          console.log('approval : ', fetchApprovalTransaction)
        } catch (err) {
          console.log("Error: ", err)
        }
         try {
          const fetchIpfsHashTransaction = await contract.holdersIpfsHash(address);
          console.log('iphs : ', fetchIpfsHashTransaction)
        } catch (err) {
           console.log("Error: ", err)
        }
        
      } 
    }

    

 
  return (
    <div className="App">
      { <Topbar/> }
      {/* <Sidebar /> */}
      {/* <PolicyHolderForm /> */}
      
      { <Deposit ipfsHashProp = {ipfsHash} setipfsStateFunction={setIpfsHash} DepositCover ={depositCoverFees}/> }
      <button onClick={fetchData}>Details</button>
    </div>
  );
}

export default App;
//