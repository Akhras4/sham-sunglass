import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
export default function Userdetails({userdetail,setuserdetail}) {
console.log(userdetail,"userdetail")
  return (
    <div>
            <div >
                <div className='lef-us'>{userdetail && userdetail.username}</div>
                <div className='lef-us'>{userdetail && userdetail.email}</div>
                <div className='lef-us'>{userdetail && userdetail.phoneNumber}</div>
             </div> 
             <Form>
      <Row>
        <Col>
          <Form.Control placeholder={userdetail && userdetail.username} />
        </Col>
        <Col>
          <Form.Control placeholder={userdetail && userdetail.email} />
        </Col>
      </Row>
    </Form>
    </div>
  )
}
