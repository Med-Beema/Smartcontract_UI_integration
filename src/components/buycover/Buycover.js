import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import "./buycover.css";
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';


export default function Buycover() {
  ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */
  const [approve, setApproval] = useState()

   const insuranceContractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
   async function depositCoverFees_Policy(ipfsUrl){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      const address = signer.getAddress();
      console.log("address: ", address);
      const coverFees = await contract.coverFees();
      console.log('coverFees ', coverFees);
      const transaction = await contract.depositCoverFees({value: coverFees});
      await transaction.wait();
      console.log('Transaction : ', transaction);
      
      ///////checking data 
      console.log("checking:");
      const readtransaction =  await contract.approvedHolders(address);
      console.log('approved?:', readtransaction);
      setApproval(readtransaction);
      
    } 
  

  }


   ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="site-card-border-less-wrapper">
        <Card title="MEDBEEMA" className="card-title" bordered={false}>
          <p class="p-8">
            Decentralized Medical Insurance is a Defi-based health insurance
            project. Defi is blockchain-based finance that does not rely on any
            central financial intermediaries. It cuts all the intermediaries
            such as brokerages, exchanges, or banks and instead utilizes smart
            contracts on blockchains. Blockchain is being explored in various
            sectors like health, finance, insurance, cryptocurrencies, NFTs,
            supply chain, and many others. This project aims to explore
            Decentralized finance in the medical insurance sector.{" "}
          </p>
        </Card>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
          
           {approve?<span>You are a Policyholder</span> : <Card className="card-Wrapper" bordered={false}>
              <div className="contentWrapper">
                <div className="imageSection">
                  <div className="Image">
                  <img
                      //src="https://academy.moralis.io/wp-content/uploads/2021/06/cover_logo.png"
                      src="https://app.nexusmutual.io/logos/ribbon.svg"
                      style={{ height: 50, width: 50 }}                      style={{ height: 50, width: 50 }}
                    ></img>
                  </div>
                  <div className="coverName">medical</div>
                </div>
                <div className="coverInfo">
                  <label className="label">Period</label>
                  <span>2021/02/04-2021/03/04</span>
                </div>
                <div className="cost">
                  <label className="label">Cost</label>
                  <span>1000</span>
                </div>
                <div>
                  <button
                    style={{
                      width: 100,
                      background: "#002b49",
                      color: "white",
                      borderRadius: 50,
                      alignItems: "center",
                      alignContent: "center",
                      marginLeft: 90,
                    }} onClick={depositCoverFees_Policy}
                  >
                    Buy Cover
                  </button>
                </div>
              </div>
            </Card>
}
          </Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </div>
  );
}