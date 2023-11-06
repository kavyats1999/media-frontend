import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getallCategories, getvideo, updateCategory } from '../services/allapi';
import { useEffect } from 'react';
import { Trash2 } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';






function Category() {

  const [allCategory, setallCategory] = useState([])

  const [CategoryItem, setcategoryItem] = useState({
    id: "",
    categoryName: "",
    videos: []
  })

  const AddCategoryForm = (e) => {
    const { name, value } = e.target

    setcategoryItem({ ...CategoryItem, [name]: value })
  }
  console.log(CategoryItem);




  //  get category

  const getcategoryList = async () => {
    // to get all category make an api call 

    let response = await getallCategories()

    console.log(response.data);

    setallCategory(response.data)
  }

  console.log(allCategory);


  useEffect(() => {
    getcategoryList()


  }, [])



  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()

    console.log(id);

    await deleteCategory(id)
    getcategoryList()
  }




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleAddCategory = async (e) => {
    e.preventDefault()
    const { id, categoryName } = CategoryItem

    if (!id || !categoryName) {
      toast.warning("please fill the form completely")
    }

    else {
      const response = await addCategory(CategoryItem)
      console.log(response);

      if (response.status >= 200 && response.status < 300) {



        //  console.log(response.data);

        setShow(false)

        toast.success("new video uploaded successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })

        getcategoryList()

      }

      else {
        toast("provide a unique id")
      }


    }

  }

  // dragover
  const dragover = e => {
    e.preventDefault()
    console.log("dragging over the category board!!!!!");
  }

  // dropped

  const dropped = async (e, categoryId) => {
    console.log(categoryId);

    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("source card id is", sourceCardId);



    //  logic to implement adding card in the given category
    let { data } = await getvideo(sourceCardId)

    console.log('source video data', data);

    let selectedCategory = allCategory.find(item => item.id == categoryId)

    console.log('target category detail', selectedCategory);

    selectedCategory.videos.push(data)

    console.log("update target category details", selectedCategory);


    await updateCategory(categoryId, selectedCategory)
    getcategoryList()
  }




  return (
    <>
      <div className="d-grid">
        <div onClick={handleShow} className='btn btn-dark m-2'>Add categories</div>
      </div>

      {
        allCategory?.map(item => (
          <div droppable onDrop={e => dropped(e, item?.id)} onDragOver={e => dragover(e)}>
            <div  className='d-flex justify-content-between border rounded mt-2 p-3'>
              <h4>{item.categoryName}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}> <Trash2 color='red'></Trash2> </span>


              <Row>

           {
            item?.videos.map((card)=>(
              <Col className='p-3 mb-1 sm={12}'>
                <Videocard card={card} insideCategory={true}/>

              
              </Col>
            ))
                      }
           </Row>
           </div>


           
          </div>
        ))
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
              <Form.Control type="text" placeholder="Id" name='id' onChange={AddCategoryForm} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Category">
              <Form.Control type="text" placeholder="Category" name='categoryName' onChange={AddCategoryForm} />
            </FloatingLabel>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Category