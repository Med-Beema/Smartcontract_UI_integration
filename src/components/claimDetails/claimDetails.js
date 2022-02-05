import React,{ useState, useEffect } from "react";
import { Descriptions, Statistic } from "antd";
import { Button } from "react-bootstrap";
import axios from "axios";
import {useParams } from "react-router-dom";
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';


export default function ClaimDetails(props) {
  const [data, setData] =useState([])
  const [hasVoted, setHasVoted ] = useState()
  const [url, setUrl] = useState('')
  const [claimInfo, setClaimInfo] = useState({})
  let params = useParams();
  const claimId = params.claimid??props.id
  const { Countdown } = Statistic;
const deadline = data[6] *1000; // Moment is also OK
function onFinish() {
  console.log("finished!");
}
  
  ///////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * SMART CONTRACT 
   */
   const insuranceContractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
   async function fetchData(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, provider);
      const address = signer.getAddress();
      console.log("address: ", address);
      const transaction = await contract.PolicyholdersClaimDetails(claimId);
      
      console.log('Transaction : ', transaction);
      setData(transaction)
      setUrl(transaction[0]);
      console.log("Url", url)
      console.log('data6', data[6])
      
      
      
      
    } 
   }
   async function Votefor(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({provider});
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      console.log({provider});
      const coverFees = await contract.coverFees();
      console.log('coverFees ', coverFees);
      
      const transaction = await contract.votefor(claimId);
      const HASVOTED = await contract.voterHasVoted(signer);
      setHasVoted(HASVOTED)
      await transaction.wait();
      setHasVoted(true)
      fetchData();
    }
  }
  async function VoteAgainst(){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({provider});
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      console.log({provider});
      const transaction = await contract.voteAgainst(claimId);
      
      await transaction.wait();
      const HASVOTED = await contract.voterHasVoted(signer);
      setHasVoted(HASVOTED)
      fetchData();
    }
  }



  
////////////////////////////////////////////////////////////////////////////////////////

useEffect(() => {
  fetchData()
    
}, []);

useEffect(() => {
  if(url!= ''&& url!=undefined){
    console.log('url',url)
    axios
  .get(url)
  .then((response) => {
    console.log(response.data);
    setClaimInfo(response.data);
    
  })
  .catch((error) => {
    console.log(error);
  });

  }
  
    
 }, [url]);


// useEffect(() => {
//   setUrl(data[0])
    
// }, [data]);


 
  return (
    <div>
      <h3>Claim Details</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>
          No. <span>#{claimId}</span>
        </h4>
        <Countdown
          title="Voting Ends In"
          value={deadline}
          onFinish={onFinish}
          valueStyle={{ fontSize: "30px" }}
        />
        {/* <div></div> */}
      </div>
      <Descriptions
        bordered
        column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        contentStyle={{ backgroundColor: "#fff" }}
        labelStyle={{ backgroundColor: "#eee", fontWeight: "bold" }}
      >
        <Descriptions.Item label="Policyholder's address" span={2}>
          {data[5]}
        </Descriptions.Item>

        <Descriptions.Item label="Date of Birth">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Validity Period" span={2}>
          2022.07.23
        </Descriptions.Item>
        <Descriptions.Item label="Claim Amount">
          {" "}
          $ <span>1800</span>
        </Descriptions.Item>

        <Descriptions.Item label="Name of Medical Institution" span={3}>
         {claimInfo.instution}
        </Descriptions.Item>
        <Descriptions.Item label="Address of Institution" span={3}>
        {claimInfo.address}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {claimInfo.description}
        </Descriptions.Item>
        <Descriptions.Item label="Documents Submitted" span={3}>
          <img
            src={claimInfo.documents}
            height="200"
            alt=""
          ></img>
          <br />
          </Descriptions.Item>
        {hasVoted? <span>You have already Voted</span>:
        <Descriptions.Item label="Vote" span={3}>
          <Button
            variant="success"
            className="ml-20"
            id="Accept"
            style={{
              fontSize: "20px",
              borderRadius: "20px",
              padding: "auto 20px",
              margin: "auto 20px",
            }} onClick ={Votefor}
          >
            Accept The Claim
          </Button>
          <Button
            variant="danger"
            className="pl-20 pr-20 ml-20"
            type="submit"
            id="Accept"
            style={{
              fontSize: "20px",
              borderRadius: "20px",
            }} onClick ={VoteAgainst}
          >
            Decline The Claim
          </Button>
          
        </Descriptions.Item>
}
      </Descriptions>
    </div>
  );
}
