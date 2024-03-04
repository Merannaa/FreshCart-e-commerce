import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import {Helmet} from 'react-helmet'



export default function Cart() {
  const[data,setData]=useState([])
  const[cartPrice,setPrice]=useState([])
  const [clr, setClr] = useState(null);

  let{getCart,updateCart,deleteCart,setCartNumber,clearCartItem}=useContext(cartContext)

  useEffect(()=>{
    (async ()=>{
      let {data} =await getCart()
      // console.log(data.data);
      if(data?.status == "success"){
        setData(data.data?.products)
        setPrice(data.data.totalCartPrice) 
      }else{
        setData([])
      }
    })()
  },[])
  

  async function removeProduct(id,count){
    let data=await deleteCart(id)
    if(count !== 0){
      setData(data.data.data.products)
      setPrice(data.data.data.totalCartPrice)
      setCartNumber(data.data.numOfCartItems)
    }else{
      setData([])
      setPrice(0)
      setCartNumber(0)
    }
    
  }

  async function updateProduct(id,count){
    if(count == 0){
      removeProduct(id)
      setCartNumber(0)
    }else{
      let data =await updateCart(id,count)
      setData(data.data.data.products)
      setCartNumber(data.data.numOfCartItems)
    setPrice(data.data.data.totalCartPrice)
    }
  }

  async function clearCartItems() {
    let data = await clearCartItem();
    // console.log(data);
    if (data.data.message === "success") {
      setClr(true)
      toast.success("Your cart cleared successfully")
      setCartNumber(data?.data?.numOfCartItems)
    }
    setData([])
    setPrice(0)
    setCartNumber(0)
    }

  return (<>
    <Helmet>
          <meta charSet="utf-8" content="Cart" />
          <title>Cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    <div className='container'>
      <div className="row">
        <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5">
        <h2>Shop Cart</h2>
        
        <div className='d-flex justify-content-between'>

        
        <div>
        <button className='border rounded-4 w-100 text-start h-100 border-danger'>You've got FREE delivery. Start <span className='fw-bold'>checkout now!</span></button>
        </div>
        <Link to="/checkout" >
        <div className='text-end'>
        <button className='btn bg-main text-light'>onlinePayment</button>
        </div>
      </Link>
      </div>
          
          <>
          <h3 className='py-3'><span className='text-main fw-bold'>Item Subtotal </span>${cartPrice}</h3>
          {data.map((product)=>{
            return <div className="row border-bottom py-5" key={product._id}>
              <div className="col-md-1">
                <img src={product.product.imageCover} className='w-100' alt={product.product.title}/>
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className='fw-bold'>{product.product.title}</h6>
                  <p className='fw-bold'>${product.price}</p>
                  <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can '></i> Remove</button>
                </div>
                <div>
                  {/* {product.count <= 0 ? */}
                  <>
                  <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className='btn btn-outline-success'>-</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className='btn btn-outline-success'>+</button>
                  </>
                  
                {/* :
                <>
                <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-success'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-success'>-</button>
                </>
                
                } */}
                
                </div>
              </div>
              
            </div>
          })}
          </>
         
          
         
          
          
          {data.length > 0 ? 
      <>
        
            <div className='text-center my-5'>
              <button onClick={()=>clearCartItems()} className='btn bg-main w-75 text-light'>Clear Cart</button>
            </div>
            </>
            :
        ''

          }
          
        </div>
      </div>
      
    </div>
    </>)
}
