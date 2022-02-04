import React,{ useState } from "react";
import { Button,Form,Container } from 'react-bootstrap';


function Deposit() {
  const [amount, setAmount] = useState(0);
  
  function handleSubmit(e){
    e.preventDefault();
    console.log(amount);
  }
  return <div>
   
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formDeposit">
          <Form.Label>Amount</Form.Label>          
          <Form.Control size="lg" type="text" placeholder="0" onChange={(e) => setAmount(e.target.value)}/>          
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </Form>
    </Container>
    
  </div>;
}
export default Deposit;
