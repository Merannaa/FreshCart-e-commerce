import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import {Helmet} from 'react-helmet'

export default function Details() {
  let {addToCart,setCartNumber}=useContext(cartContext)
  const [productDetails,setDetails]= useState(null)
  let params=useParams()
  let productId=params.id
  // console.log(params.id);

    async function getProduct(){
      let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      // console.log(data.data);
      setDetails(data.data)
    }

    async function addToMyCart(id){
      let {data}= await addToCart(id)
      // console.log(data);
      if(data.status == 'success'){
        // console.log('hi');
        toast.success(data.message);
        setCartNumber(data.numOfCartItems)
      }
    }

    useEffect(()=>{
      getProduct()
    },[])
  return (
    <div className='container p-3 my-5'>
      <div className="row">
      {productDetails !== null ?
      <>
      <div className="col-md-3">
          <img src={productDetails?.imageCover} className='w-100' alt={productDetails?.title}/>
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around">
          <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
          </div>

          <div>
            <p className='fw-bold text-main'>{productDetails?.category.name}</p>
            <div className='d-flex justify-content-between'>
            <p className='fw-bold'><span className='text-main fw-bold'>Price </span>${productDetails?.price}</p>
            <p className='fw-bold'><span className='text-main'></span><i className='fa-solid fa-star ratingColor fs-5'></i>{productDetails?.ratingsAverage}$</p>

            </div>
            <button onClick={()=>{addToMyCart(productDetails._id)}} className=' fw-bold btn bg-main text-light w-100'>+Add to cart</button>
          </div>
          
        </div>

        <div class="py-4 mb-4">
		      <h4>Add a written review</h4>
		        <textarea className="form-control" rows="6" placeholder="What did you like or dislike? What did you use this product for?"></textarea>
	      </div>
          <div className="d-flex justify-content-end">
          <a href="#" className="btn bg-main text-light">Submit Review</a>
      </div>
      </>
      :
      <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
    }
      </div>
    </div>
  )
}
