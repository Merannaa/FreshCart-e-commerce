import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import {Helmet} from 'react-helmet'


export default function Category() {
  const [categoryList,setCategory]=useState([])
  
  async function getCategory(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    // console.log(data.data);
    setCategory(data.data)
  }
  useEffect(()=>{
    getCategory()
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return ( <>
  <Helmet>
        <meta charSet="utf-8" content="category" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
 
    <div>
      <h2 className='border-bottom py-3'> Featured Categories</h2>
      <Slider {...settings}>
        {categoryList.map((category)=>{
          return <div className='' key={category._id}>
            <Link to={`/categorydetails/${category._id}`}>
            <img src={category.image} className='w-100' height={270} alt={category.title}/>
            <p>{category.name}</p>
            </Link>
          
          </div>
        })}
      </Slider>
    </div>
    </>)
}
