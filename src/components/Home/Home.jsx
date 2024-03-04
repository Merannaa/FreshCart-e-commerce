import React, { useContext } from 'react'
import { counterContext } from '../../context/counterContext'
import Products from '../Products/Products'
import Category from '../Category/Category'
import HomeSlider from '../slider/HomeSlider'
import {Helmet} from 'react-helmet'

export default function Home() {
  
  // let {y} =useContext(counterContext)
  let{counter,changeCounter}=useContext(counterContext)
  // console.log(x);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" content="freshcart" />
        <title>FreshCart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
          <div className='py-5'>
          <HomeSlider/>
          </div>
          <div>
          <Category/>
          </div>
          <div className='py-5'>
          <Products/>
        </div>
      
      </div>
      {/* <p>{counter}</p>
      <button onClick={()=>{changeCounter()}} className='btn btn-danger'>change count</button> */}
    
    
    </div>
  )
}
