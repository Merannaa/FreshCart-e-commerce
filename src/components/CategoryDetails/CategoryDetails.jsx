import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import '../Category/Category'
import {Helmet} from 'react-helmet'




export default function CategoryDetails() {

  const [categoriesList, setCategoriesList] = useState(null)

  let params=useParams()
  let productId=params.id
  console.log(productId)



  async function GetAllSubCategories() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${productId}/subcategories`);
    console.log(data);
    setCategoriesList(data?.data)
  }

  useEffect(() => {
    GetAllSubCategories();
   
  }, []);

  return (
    
    <>
    <Helmet>
        <meta charSet="utf-8" content="categoryDetails" />
        <title>CategoryDetails</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {categoriesList == null ? <div className='vh-100 d-flex justify-content-center align-items-center'>
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
      :
      <div className='container w-75 mx-auto bg-main-light p-4 '>
        <div className='row align-items-center g-4'>
        
          <div className='col-md-11 '>
          <Link to={`/category`}>
          <h4 className='text-main btn btn-outline-success'>Shop by Categories</h4>
          </Link>
          
        {categoriesList.map((subcategory)=>{
        return <div className='col-md-12  border-bottom py-5 text-center' key={subcategory._id}>
                <h4 className=" text-muted fw-bold bg me-3 py-3 shadow-sm">{subcategory.name}</h4>
              </div>
            })}
            
            </div>
        </div>

      </div>
}
    </>
  )
}
