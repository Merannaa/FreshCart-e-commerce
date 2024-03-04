import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import toast from 'react-hot-toast'
import {Helmet} from 'react-helmet'



export default function Products() {
  let {addToCart,setCartNumber}=useContext(cartContext)
  const [productList,setProduct]=useState([])

  async function getProducts(){
    let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    // console.log(data);
    setProduct(data.data)
  }

    async function addToMyCart(id){
      let {data}= await addToCart(id)
      // console.log(data);
      if(data?.status == 'success'){
        // console.log('hi');
        toast.success(data?.message);
        setCartNumber(data?.numOfCartItems)
      }
    }

  useEffect(()=>{
    getProducts()
    
  },[])
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" content="product" />
        <title>FreshCart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
    <div className='row gy-5'>
          <h2 className='border-bottom py-4'>Popular Products</h2>
      {productList.length > 0 ?
      <>
      {productList.map((product)=>{
        return <div className="col-md-3" key={product._id}>
            <div className="product p-5 position-relative">

              <WishlistIcon productID={product._id}/>

              <Link to={`/details/${product._id}`}>
              <img src={product.imageCover} className='w-100' alt={product.title}/>
              <p className='text-main'>{product.category.name}</p>
              <h6>{product.title}</h6>
              <div className='d-flex justify-content-between'>
                <p>{product.price}$</p>
                <p>{product.ratingsAverage}<i className='fa-solid fa-star ratingColor'></i></p>
              </div>
              </Link>
              <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main text-light w-100 fw-bold'>+ Add to cart</button>
            </div>
        </div>
      })      
      }
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
    </>)
}
