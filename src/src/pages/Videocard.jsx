import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteVideo } from '../services/allapi';



function Videocard({card,handledeleteStatus}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const removeItem=async(id)=>{

   const response= await deleteVideo(id)
    console.log(response);

    if(response.status>=200&&response.status<300){
      handledeleteStatus(true)
    }



  }

  return (
    <>
        <div>

        <Card  className='shadow'>
      <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
            <span>{card?.caption}</span>
            <Trash2 onClick={()=>removeItem(card?.id)} style={{float:'right'}} color='red'/>
        </Card.Title>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width={'100%'} height={'400px'} src={`${card?.url}?autoplay=1`} title="Heeriye (Official Video) Jasleen Royal ft. Arijit Singh | Dulquer Salmaan | Aditya| Taani | Memories" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        
      </Modal>
            
        </div>
    </>
  )
}

export default Videocard