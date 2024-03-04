import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'



export default function Brands() {

async function getBrands(){
  return await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
  }
  let{data,isLoading,isFetching,refetch}=useQuery('brands',getBrands)
  
  return (<>
  <Helmet>
        <meta charSet="utf-8" content="brands" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
<div className="container">
<h2 className='text-center p-3'>All Brands</h2>
<div className="row gy-4 shadow">
{ !isLoading ?
<>
  {
  data?.data?.data?.map((brand)=>{
    return <div type="button" className="col-md-3" key={brand._id} >
      <Link data-bs-toggle="modal" data-bs-target={`#${brand.name}`}>
        <img src={brand.image} className='w-100' alt={brand.name} />
        <p className='fw-bold text-muted'>{brand.name}</p>
      </Link>
              
    <div className="modal fade" id={brand.name} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Brand</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body text-center">
            <h2 className='fw-bold '>{brand.name}</h2>
            <p className=' text-main'>{brand.slug}</p>
            <img className='w-50 shadow border-bottom' src={brand.image} alt="brand" />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  })}

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
</> )
}
  
