import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { cartContext } from '../../context/cartContext'
import {Helmet} from 'react-helmet'


export default function Checkout() {
  let{checkoutPayment,getCart}=useContext(cartContext)
  const[isLoading,setLoading]=useState(false)
  const[errMsg,setErr]=useState(null)
  const[cartId,setCartId]=useState('')

// let id='65ddb744be8b5232354663d3'
useEffect(()=>{
  (async ()=>{
    let data =await getCart()
    console.log(data.data.data._id);
    setCartId(data.data.data._id)
  })()
},[])
    async function payment(values){
      // console.log(values);
      // setLoading(true)
      let data =await checkoutPayment(cartId,values)
      // console.log(data);
      if(data.data.status == 'success'){
        window.location=data.data.session.url
      }
    }
    let formik = useFormik({
      initialValues:{
        details:'',
        city:'',
        phone:'',
      },
      onSubmit:payment
      
    })
    
    return (<>
    <Helmet>
        <meta charSet="utf-8" content="checkout" />
        <title>Checkout</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className='container my-5'>
        <h1 className='text-main text-center'>Payment Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8 m-auto w-50 bg-light shadow p-4">
              <div className="row gy-4">
              
            <div className="col-md-12">
              <label htmlFor='urDetails'>Details</label>
              <input type='text' id='urDetails' name="details"  value={formik.values.details} onChange={formik.handleChange} className='form-control'/>
              
            </div>
            
            <div className="col-md-12">
              <label htmlFor='urCity'>City</label>
              <input type='text' id='urCity' name="city"  value={formik.values.city}  onChange={formik.handleChange} className='form-control'/>
              
            </div>
            <div className="col-md-12">
              <label htmlFor='urPhone'>Phone</label>
              <input type='tel' id='urPhone' name="phone"  value={formik.values.phone}  onChange={formik.handleChange} className='form-control'/>
              
            </div>
            
            
            <div className="col-md-12 text-end my-3">
              <button  type='submit' className='btn bg-main text-light'>Pay Online
              {isLoading ?
              <span>
              <i className='fa-solid fa-spinner fa-spin mx-2 text-light'></i>
            </span>
                :
                ''
                }
              
              </button> 
            </div>
              
              </div>
            </div>
        
          </div>
        </form>
      </div>
      </>)
}
