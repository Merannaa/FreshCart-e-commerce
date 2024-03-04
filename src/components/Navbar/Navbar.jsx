import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {userContext} from '../../context/TokenContext'
import { cartContext } from '../../context/cartContext'
import logo from '../../assests/img/freshcart-logo.svg'
import { wishlistContext } from '../../context/wishlistContext'

export default function Navbar() {
  // let {y}=useContext(counterContext)
  // let {counter}=useContext(counterContext)
  let {userToken,setToken}=useContext(userContext)
  let{cartNumber,getCart,setCartNumber}=useContext(cartContext)
  let{wishlistNumber}=useContext(wishlistContext)

  let navigate =useNavigate()
  
function Logout(){
    localStorage.removeItem('userToken')
    setToken(null)
    navigate('/signin')
  }

  useEffect(()=>{
    (async ()=>{
      let data =await getCart()
      // console.log(data.data.data);
      setCartNumber(data?.numOfCartItems)
      // console.log(data.numOfCartItems);
    })()
  },[])

  // console.log(userToken);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="home">
          {/* <i className="fa-solid text-main fa-cart-shopping"></i><span className='fw-bold'>FreshCart</span> */}
            <img src={logo}/>
            </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userToken !== null ?
            
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="product">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="category">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="allorders">All Order</Link>
              </li>
              
            </ul>
            :
            ''
          }
            
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken == null ?
            <>
            <li className="nav-item">
                <Link className="nav-link" to="signup">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signin">Login</Link>
              </li>
            </>
            :
            ''
          }
              
            {userToken !== null ?
            <>
            <li className="nav-item d-flex align-items-center">
              <i className='fa-brands fa-facebook mx-3'></i>
              <i className='fa-brands fa-twitter mx-3'></i>
              <i className='fa-brands fa-instagram mx-3'></i>
              <i className='fa-brands fa-linkedin mx-3'></i>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="profile">
                  <i className='fa-solid fa-user'></i>
                  <span className='bg-main text-light'></span>
                </Link>
              </li>
            <li className="nav-item">
                <Link className="nav-link" to="wishlist">
                  <i className='fa-solid fa-heart'></i>
                  <span className='badge bg-main text-light'>{wishlistNumber}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">
                  <i className='fa-solid fa-shopping-cart'></i>
                  <span className='badge bg-main text-light'>{cartNumber}</span>
                </Link>
              </li>
              
              <li onClick={()=>{Logout()}} className="nav-item">
                <Link className="nav-link">Logout</Link>
              </li>
            </>
            :''
          }
              
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  )
}
