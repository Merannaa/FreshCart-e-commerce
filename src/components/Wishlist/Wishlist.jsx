import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../context/wishlistContext'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import {Helmet} from 'react-helmet'


export default function Wishlist() {
  let{getWish,wishlist,setWishlist,deleteWishlist,wishlistNumber,setWishNumber}=useContext(wishlistContext)
  let {addToCart,setCartNumber}=useContext(cartContext)

  async function removeWishlist(id){
    let data=await deleteWishlist(id)
    if (data.data.count !== 0){
      setWishlist(data.data.data);
      setWishNumber(data.data.count)
      getWish()
    }
    if (data.data.status === "success") {
      toast.success("removed successfully from your Whishlist")
    }
    
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

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" content="wishlist" />
        <title>Wishlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
    <div className='container'>
      <div className="row">
        {wishlist !== null ?
        <>
        <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5">
        <h2>My Wishlist</h2>

          <div className='d-flex justify-content-between'>
            <div>
              <p>There are <span>{wishlistNumber}</span> products in this wishlist.</p>
            </div>
        
            <Link to="/checkout" >
            <div className='text-end'>
              <button className='btn bg-main text-light'>Checkout</button>
            </div>
            </Link>
          </div>
          
        <div className="row border-bottom my-5 ">
        <div className="col-md-2">
                <h6 className='w-100'></h6>
              </div>
              <div className="col-md-10 d-flex justify-content-between align-items-center">

                  <h6 className='fw-bold'>Product</h6>
                <h6 className='fw-bold'>Amount</h6>
                  <h6 className='fw-bold'>Actions</h6>
                <h6 className='fw-bold'>Remove</h6>
                </div>

          {wishlist.map((product)=>{
            return <div className="row border-bottom py-2" key={product._id}>
              <div className="col-md-2">
                <img src={product.imageCover} className='w-100' alt={product.title}/>
              </div>
              <div className="col-md-10 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className='fw-bold'>{product.title}</h6>
                </div>
                <div>
                <p>${product.price}</p>
                </div>
                <div>
                  
                  <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main text-light'>Add to cart</button>
                </div>
                <div>
                <button onClick={()=>{removeWishlist(product._id)}} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can'></i></button>
                </div>
              </div>
            </div>
          })}
      
        </div>
        </div>
    <Link to="/home">
      <div className='text-center my-5'>
      <button className='w-75 btn bg-main text-light'>Continue Shopping</button>

      </div>
    </Link>
        
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
      
    
      </>)
}
