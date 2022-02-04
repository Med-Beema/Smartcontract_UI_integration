import React, { useState, useEffect } from "react";
import { Table } from "antd";
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';


export default function Claims() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
      const address = signer.getAddress();
      console.log("address: ", address);
      let numberOfConst = await contract.claimID();
        console.log("claimId", numberOfConst)
      try {          
        
        
        for (let i=1; i<=numberOfConst; i++) {
          const fetchClaims = await contract.PolicyholdersClaimDetails(i);
          data[i] =[{
            id: i,
          cover: fetchClaims.Claimer,
           coverAmount: 45676788,
          coverPeriod: "2021/02/09 - 2022/01/09",
           status: fetchClaims.status,
            

          }]
      }
        
      } catch (err) {
        console.log("Error: ", err)
      }      
    } 
  }



  //////////////////////////////////

  useEffect(() => {
    fetchData()
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // return () => {

    // };
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "COVER",
      dataIndex: "cover",
    },
    {
      key: "3",
      title: "COVER AMOUNT",
      dataIndex: "coverAmount",
      sorter: (amount1, amount2) => {
        return amount1.coverAmount > amount2.coverAmount;
      },
    },
    {
      key: "4",
      title: "COVER PERIOD",
      dataIndex: "coverPeriod",
    },
    {
      key: "5",
      title: "STATUS",
      dataIndex: "status",
      filters: [
        { text: "Accepted", value: "Accepted" },
        { text: "Rejected", value: "Rejected" },
        { text: "Open To Assessors", value: "Open To Assessors" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      key: "6",
      title: "ACTION",
      dataIndex: "",
      render: () => <a href="#">View</a>,
    },
  ];
  let data = [
    // {
    //   id: 1,
    //   cover: "John Brown",
    //   coverAmount: 45676788,
    //   coverPeriod: "2021/02/09 - 2022/01/09",
    //   status: "Accepted",
    // },
    // {
    //   id: 2,
    //   cover: "John Brown",
    //   coverAmount: 200,
    //   coverPeriod: "2021/02/09 - 2022/01/09",
    //   status: "Accepted",
    // },
    // {
    //   id: 3,
    //   cover: "John Brown",
    //   coverAmount: 45676788,
    //   coverPeriod: "2021/02/09 - 2022/01/09",
    //   status: "Open To Assessors",
    // },
    // {
    //   id: 4,
    //   cover: "John Brown",
    //   coverAmount: 0,
    //   coverPeriod: "2021/02/09 - 2022/01/09",
    //   status: "Rejected",
    // },
  ];
  return (
    <div>
      <header className="">
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        ></Table>
      </header>
    </div>
  );
}
