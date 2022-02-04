import React, { useState } from "react";
import "./policyholderform.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import InsuranceSystem from '../artifacts/contracts/InsuranceSystem.sol/InsuranceSystem.json'
import {ethers} from 'ethers';


export default function PolicyHolderForm() {
  
   const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    fatherName: "",
    dob: "",
    permanentAddress: "",
    occupation: "",
    contactNum: "",
    photo: "",
    identificationNum: "",
    idType: "",
    issuedDate: "",
    issuedPlace: "",
    identificationPhoto: "",
    signature: "",
  });
  function handleChange(e) {
    const data = e.target.value;
    setValues({
      ...values,
      [e.target.name]: data,
    });
  }

  function handleImageChange(e) {
    setLoading(true);
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
      setLoading(false);
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
          
          mapAddressToDetailsHash(response.data.image)
          //response.data.image
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
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function mapAddressToDetailsHash(ipfsUrl){
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({provider});
      const signer = provider.getSigner();
      const contract = new ethers.Contract(insuranceContractAddress, InsuranceSystem.abi, signer);
      const address = signer.getAddress();
      console.log("address: ", address);
      const transaction = await contract.submitPolicyHolder(ipfsUrl);
      await transaction.wait();
      console.log('Transaction : ', transaction);
      
      ///////checking data 
      console.log("checking:");
      const readtransaction =  await contract.holdersDetailsIpfsHash(address);
      console.log('ipfs hash:', readtransaction);
      
    } 
  

  }
////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Row className="align-items-center">
          <Col sm={3}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={values.name}
                name="name"
                type="text"
                onChange={handleChange}
                hasfeedback="true"
                rules={[{ required: true, message: "Please enter valid name" }]}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>Fathers Name</Form.Label>
              <Form.Control
                required
                value={values.fatherName}
                name="fatherName"
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                required
                value={values.dob}
                name="dob"
                type="date"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                value={values.permanentAddress}
                name="permanentAddress"
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                required
                value={values.occupation}
                name="occupation"
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                required
                value={values.contactNum}
                name="contactNum"
                type="tel"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>ID Type</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.idType}
                name="idType"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>Identification</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.identificationNum}
                name="identificationNum"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>Issued Date</Form.Label>
              <Form.Control
                required
                type="date"
                value={values.issuedDate}
                name="issuedDate"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3">
              <Form.Label>Issued Place</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.issuePlace}
                name="issuePlace"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                required
                type="file"
                name="photo"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            {values.photo && (
              <img src={values.photo} width={200} height={200} />
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Identification Photo</Form.Label>
              <Form.Control
                required
                type="file"
                name="identificationPhoto"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            {values.identificationPhoto && (
              <img src={values.identificationPhoto} width={200} height={200} />
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Signature</Form.Label>
              <Form.Control
                required
                type="file"
                name="signature"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            {values.signature && (
              <img src={values.signature} width={200} height={200} />
            )}
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
