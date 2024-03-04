import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import {Helmet} from 'react-helmet'

export default function Allorders() {
const [orderList,setOrderList]=useState([])

function getOrder(){
  const userID=localStorage.getItem('userid')
  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
  .then((data)=>{
    setOrderList(data.data)
  })
    .catch((err)=>{
      return err
    })
  }
  useEffect(()=>{
    getOrder()
    },[])

  if (!orderList){
    return <div className='vh-100 d-flex justify-content-center align-items-center'>
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

  return <>
  <Helmet>
          <meta charSet="utf-8" content="orders" />
          <title>Orders</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>{" "}
    <div className='container'>
    <div className="row">
      {orderList.map((order)=>{
        return <div key={order._id} className="col-md-11 bg-main-light shadow py-5 m-auto my-5">
        <h2>Order Details</h2>
        <div >
        <div>
        <h3 className='fw-bold'>Thank you for your purchase!</h3>
        <p>Your order has been placed successfully!</p>
        <div className="col-md-12 border-bottom ">
          <div className='d-flex justify-content-between'>
          <div className=' py-3'>
            <h5 className=''>Payment Method <span className='text-main'>{order.paymentMethodType}</span></h5>
            <h5 className=' py-3'>Order Price <span className='text-main'>${order.totalOrderPrice}</span></h5>
          </div>
          <div className=''>
            <h5>Deliver to</h5>
            <h6 >City: <span className='text-main'>{order.shippingAddress.city}</span></h6>
            <h6 > Phone Number:<span className='text-main'>{order.shippingAddress.phone}</span> </h6> 
              <h6 >With Details: <span className='text-main'>{order.shippingAddress.details}</span></h6> 
            </div>
          </div>
          
        </div>
        {order.cartItems.map((item)=>{
          return <div key={item._id} className="row border-bottom py-3 ">
          <div className='d-flex justify-content-between align-items-center'>
            <div className='col-md-2'>
            <img className='w-100' src={item.product.imageCover} alt={item.product.title}/>
            </div>
            <div className='col-md-10 text-end'>
            <h6><span className='text-main'>{item.product.title}</span></h6>
            <p>Price: <span className='text-main'>${item.price}</span></p>
            <p>Quantity :<span className='text-main'>{item.count}</span></p>
            </div>
          </div>
        </div>
        })}
        
        </div>
        <Link to="/home" >
        <div className='py-5'>
        <button className='btn bg-main text-light'>Continue Shopping</button>
        </div>
      </Link>
      </div>
      </div>

})      
}
      
    </div>
    </div>
    </>
}
