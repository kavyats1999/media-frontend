

import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'



function Homepage() {
  // create a state
  const[serverRes,setserverRes]=useState({})

  // create a function

  const handleresponse=(res)=>{

    setserverRes(res)

  }


  return (
    <>
      <div>
        <h1 className='text-info ms-5 mb-5'>All VideoCards</h1>

        <div className='container-fluid'>

          <Row className='mt-5'>

            <Col lg={1}>
              <Add handleresponse={handleresponse}/>
            </Col>

            <Col lg={7}>
              <View serverRes={serverRes}/>
            </Col>

            <Col lg={4}>
              <Category/>
            </Col>

          </Row>
          
        </div>
      </div>
    </>
  )
}

export default Homepage