

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Landingpage() {

// useNavigate is a hook

const navigate=useNavigate()
 const handleNavigate=()=>{
  //navigate to home

  navigate('/home')

 


 }

  return (
    <div>
       <Row className='align-items-center'>
         <Col></Col>
         <Col lg={6}>
            <h1>Welcome video.com</h1>

            <p style={{textAlign:'justify'}}>Where User can use their favorite videos user can upload any videos by copy and paste their url video.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free try it now!!!!</p>
            <button onClick={handleNavigate} className='btn btn-success'>Click here to Know More</button>
         </Col>
         <Col lg={4}>
          <img className='img-fluid' src="https://png.pngtree.com/png-vector/20221001/ourmid/pngtree-music-player-icon-png-image_6248707.png" alt="no image" />
         </Col>
         <Col></Col>
       </Row>
    </div>
  )
}

export default Landingpage