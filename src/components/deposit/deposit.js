import React from 'react';
import { Button,Form,Container } from 'react-bootstrap';


export default function Deposit(props) {
  
  
  function handleSubmit(e){
    e.preventDefault();
    console.log(props.ipfsHashProp);
    props.DepositCover(props.ipfsHashProp);
    
  }
  
  return <div>
   
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formDeposit">
          <Form.Label>IPFS Hash</Form.Label>          
          <Form.Control size="lg" type="text" placeholder="0" onChange={(e)=>props.setipfsStateFunction(e.target.value)}/>          
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </Form>
    </Container>
  </div>
}
