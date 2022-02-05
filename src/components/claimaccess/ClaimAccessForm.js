import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';

export default function ClaimAccessForm() {
  const [validated, setValidated] = useState(false);

  const [values, setValues] = useState({
    amount: "",
    instution: "",
    address: "",
    description: "",
    documents: "",
  });
  function handleChange(e) {
    const data = e.target.value;
    setValues({
      ...values,
      [e.target.name]: data,
    });
  }

  function handleFileChange(e) {
    if (e.target.files.length) {
      let formData = new FormData();
      formData.set("image", e.target.files[0]);
      axios
        .post("http://localhost:5000/api/uploadImage", formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setValues((prevState) => ({
              ...prevState,
              [e.target.name]: res.data.image,
            }));
          }
        });
    }
  }

  function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log(values);
      axios
        .post("http://localhost:5000/api/data", values)
        .then((response) => {
          console.log(response);
          mapAddressToClaimHash(response.data.image)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setValidated(true);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * SMART CONTRACT 
   */
   const insuranceContractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
   const contractAddress="";
   async function requestAccount() {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
   }
 
   async function mapAddressToClaimHash(ipfsUrl){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      const address = signer.getAddress();
      console.log("address: ", address);
      const transaction = await contract.submitClaim(ipfsUrl);
      await transaction.wait();
      console.log('Transaction : ', transaction);
      
      ///////checking data 
      console.log("checking:");
      const readtransaction =  await contract.PolicyholdersClaimDetails(1);
      console.log('ipfs hash:', readtransaction);
      console.log('')
    }
   
 
   }
 /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Container>
      <Form
        className="row g-2"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                value={values.amount}
                name="amount"
                type="text"
                onChange={handleChange}
                hasfeedback="true"
                rules={[{ required: true, message: "Please enter number" }]}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name Of Institution</Form.Label>
              <Form.Control
                required
                value={values.institution}
                name="instution"
                type="text"
                placeholder="hospitals,pharamcy,anu other medical institutions"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                value={values.address}
                name="address"
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                value={values.description}
                name="description"
                type="textArea"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Documents</Form.Label>
              {values.documents && (
                <img src={values.documents} width={200} height={200} />
              )}
              <Form.Control
                required
                type="file"
                name="documents"
                onChange={handleFileChange}
                //multiple
                accept="image/*"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}
