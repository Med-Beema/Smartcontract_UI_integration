import { Card, Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DollarText from "./DollarText";
// const { Option } = Select;
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';

function Swap(props) {
  const exchangeRateToken = 0.01;
  const exchangeRateDollar = 2000;
  //   const isWalletConnected = props.isWalletConnected;
  const [tokenAmount, setTokenAmount] = useState(0);
  const [ethAmount, setEthAmount] = useState(tokenAmount * exchangeRateToken);

  const tokenName = "ITKN";

  function handleSubmit(e) {
    e.preventDefault();
    console.log(tokenAmount);
  }

  //   const selectAfter = (
  //     <Select defaultValue="ETH" className="select-after">
  //       <Option value="ETH">ETH</Option>
  //       <Option value={tokenName}>DMI</Option>
  //     </Select>
  //   );

  function handleTokenChange(value) {
    setTokenAmount(value);
  }

  useEffect(() => {
    setEthAmount(tokenAmount * exchangeRateToken);
  }, [tokenAmount]);

  ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */

   const insuranceContractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function BuyTokens(ipfsUrl){
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
       let capitalamount = ethAmount.toString();
       const transaction = await contract.depostCapital({value: ethers.utils.parseUnits(capitalamount,'ether')});
       await transaction.wait();
       console.log('Transaction : ', transaction);
       
       ///////checking data 
       console.log("checking:");
       const readtransaction =  await contract.investedTokens(address);
       console.log('ipfs hash:', readtransaction);
       
     } 
   
 
   }
 ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {/* <Container> */}
      <h1>Swap</h1>
      <p>
        Become an <strong>INVESTOR</strong>. Buy or Sell ITKN tokens. ITKN tokens
        grant you proportional power in MedBeema.
      </p>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* you pay */}
            <Col span={9}>
              <div
                // :active
                style={{
                  borderColor: "rgb(80, 195, 146)",
                  boxShadow: "rgba(25,135,84,.5) 0px 0px 0px 6px",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <Form.Group className="mb-3" controlId="formDeposit">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>You Receive:</Form.Label>
                    {/* <span>Max</span> */}
                  </div>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="0"
                    // addonAfter={selectAfter} only in  ant form
                    onChange={(e) => handleTokenChange(e.target.value)}
                    style={{
                      textAlign: "right",
                      // outline: "none",
                      border: "none",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      // alignItems: "center",
                    }}
                  >
                    <DollarText
                      value={
                        tokenAmount * exchangeRateToken * exchangeRateDollar
                      }
                    />
                  </div>
                </Form.Group>
              </div>
            </Col>

            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>ic_fluent_arrow_swap_24_filled</title>
                <desc>Created with Sketch.</desc>
                <g
                  id="🔍-System-Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="ic_fluent_arrow_swap_24_filled"
                    fill="#212121"
                    fill-rule="nonzero"
                  >
                    <path
                      d="M15.2070711,2.29150857 L19.2070711,6.28728008 C19.5677136,6.64754135 19.5957745,7.2146968 19.291028,7.60715135 L19.2079078,7.70140455 L15.2079078,11.7066438 C14.8176391,12.0974236 14.1844743,12.097838 13.7936945,11.7075694 C13.4329747,11.3473215 13.4048739,10.7801087 13.709642,10.3876179 L13.7927689,10.2933562 L16.0833383,7.9999892 L5.49966166,8 C4.98682582,8 4.5641545,7.61395981 4.50638939,7.11662112 L4.49966166,7 C4.49966166,6.48716416 4.88570185,6.06449284 5.38304053,6.00672773 L5.49966166,6 L16.0903383,5.9999892 L13.7936056,3.70646983 C13.4329311,3.34617656 13.4049015,2.77896025 13.7097189,2.38650778 L13.7928577,2.29225647 C14.153151,1.93158192 14.7203673,1.90355241 15.1128198,2.2083698 L15.2070711,2.29150857 L19.2070711,6.28728008 L15.2070711,2.29150857 Z M19.490394,16.8833789 L19.4971217,17 C19.4971217,17.5128358 19.1110815,17.9355072 18.6137428,17.9932723 L18.4971217,18 L7.91333834,17.9999892 L10.2071125,20.2925607 C10.5677659,20.6528751 10.5957623,21.220093 10.2909219,21.6125277 L10.2077776,21.7067741 C9.84746324,22.0674276 9.28024529,22.0954239 8.88781066,21.7905836 L8.79356421,21.7074393 L4.79356421,17.7112002 C4.43291063,17.3508857 4.40491442,16.7836675 4.70975502,16.3912329 L4.79289937,16.2969864 L8.79289937,12.2932256 C9.18324012,11.9025178 9.81640503,11.9022203 10.2071128,12.292561 C10.5677661,12.6528756 10.5957622,13.2200935 10.2909216,13.612528 L10.2077773,13.7067744 L7.91733834,15.9999892 L18.4971217,16 C19.0099576,16 19.4326289,16.3860402 19.490394,16.8833789 L19.4971217,17 L19.490394,16.8833789 Z"
                      id="🎨-Color"
                    ></path>
                  </g>
                </g>
              </svg>
            </Col>

            {/* You Pay */}
            <Col span={9}>
              <div
                // :active
                style={{
                  borderColor: "rgb(80, 195, 146)",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <Form.Group className="mb-3" controlId="formDeposit">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>You Pay:</Form.Label>
                    {/* <span>Max</span> */}
                  </div>
                  <Form.Control
                    disabled
                    size="lg"
                    type="text"
                    placeholder="0"
                    // addonAfter={selectAfter} only in  ant form
                    style={{
                      textAlign: "right",
                      // outline: "none",
                      border: "none",
                    }}
                    value={ethAmount}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      // alignItems: "center",
                    }}
                  >
                    <DollarText value={ethAmount * exchangeRateDollar} />
                  </div>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
        <br />
        <div style={{ fontSize: "20px" }}>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Rate:
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              1 {tokenName} ≈ {exchangeRateToken} ETH
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Inverse rate:
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              1 ETH ≈ {1 / exchangeRateToken} {tokenName}
            </Col>
          </Row>
          {/* <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Slippage tolerance:
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              1 NXM ≈ 0.0335 ETH
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Minimum received:
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              0.0000 NXM
            </Col>
          </Row> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            {/* <Button
              variant="outline-primary"
              style={{ fontSize: "20px", borderRadius: "20px" }}
            >
              Connect Wallet
            </Button> */}
            <Button
              variant="outline-success"
              className="pl-20 pr-20 ml-20"
              type="submit"
              style={{
                fontSize: "20px",
                borderRadius: "20px",
              }} onClick={BuyTokens}
            >
              Buy
            </Button>
          </div>
        </div>
      </Card>
      {/* </Container> */}
    </div>
  );
}
export default Swap;
