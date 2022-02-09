import React from "react";
import { Card, Row, Col, Tooltip, Progress } from "antd";
import "./claimresult.css";
import {useParams } from "react-router-dom";
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';
export default function ClaimResult(props) {
  let params = useParams();
  const claimId = params.claimid??props.id
  /**
   * SMART CONTRACT Function
   
   */

   async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
    const insuranceSystemContractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const tokenContractAddress ="0x5FbDB2315678afecb367f032d93F642f64180aa3"
   async function fetchData(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceSystemContractAddress, InsuranceSystem.abi, provider);
      const address = await signer.getAddress();
      console.log("address: ", address);
      let numberOfConst = await contract.claimID();
        console.log("claimId", numberOfConst)
        const transaction = await contract.PolicyholdersClaimDetails(claimId)

        const result = await contract.VotingResults(transaction[2]);
        console.log(result);
    }
  }
      
        
        
      
     
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Card style={{ width: "auto", height: "auto" }}>
        <div className="cardHeader">
          <label
            style={{
              fontSize: 20,
              fontFamily: "sans-serif",
              fontWeight: 450,
              color: "rgb(80, 80, 80)",
            }}
          >
            Status
          </label>
          <div className="acceptedResult">Accepted</div>
            </div>
        <Row style={{ padding: "20px 10px" }}>
          <Col span={8}>
            <Row>
              <Col sm={8}>
                <div>
                  <img
                    className="Image"
                    src="https://app.nexusmutual.io/logos/ribbon.svg"
                  ></img>
                </div>
              </Col>

              <Col sm={6}>
                <div className="coverName">medical</div>
              </Col>
            </Row>
          </Col>
          <Col span={8} className="textStyle">
            <Row>
              <Col sm={6}>Purchase :</Col>
              <Col sm={12}>10/17/2021 2:15 AM</Col>
            </Row>
            <Row>
              <Col sm={6}>Expiry :</Col>
              <Col sm={12}>10/17/2021 2:15 AM</Col>
            </Row>
          </Col>
          <Col span={8} className="textStyle">
            <Row>
              <Col sm={6}>Submitted :</Col>
              <Col sm={12}>10/17/2021 2:15 AM</Col>
            </Row>
            <Row>
              <Col sm={6}>Amount</Col>
              <Col sm={12}>12Eth</Col>
            </Row>
          </Col>
        </Row>
       
        <Row className="progressBar">
          <Tooltip title="3 done / 3 in progress / 4 to do">
            <Progress
              percent={100}
              success={{ percent: 30 }}
              strokeColor="red"
            />
          </Tooltip>
        </Row>
      </Card>
    </div>
  );
}
