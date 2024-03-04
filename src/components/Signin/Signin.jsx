import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import { userContext } from '../../context/TokenContext';
import {Helmet} from 'react-helmet'


export default function Signin() {
  let {userToken,setToken}=useContext(userContext)
  // console.log(x);

    const[isLoading,setLoading]=useState(false)
    const[errMsg,setErr]=useState(null)

    let navigate =useNavigate()
    let validationSchema=Yup.object({
      email:Yup.string().required('email is required').email('enter a vaild email'),
      password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter availd password'),
    })

    async function signIn(values){
      // console.log(values);
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message)
      setLoading(false)
      })
      console.log(data);
      if(data.message == 'success'){
        navigate('/home')
        localStorage.setItem('userToken',data.token)
        setToken(data.token)
        console.log(userToken);
        setLoading(false)
      }
    }
    let formik = useFormik({
      initialValues:{
        email:'',
        password:'',
      },
      // validate:validate
      // ,
      validationSchema:validationSchema,
      onSubmit:signIn
      
    })
    
    return (<>
    <Helmet>
        <meta charSet="utf-8" content="Signin" />
        <title>Signin</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
      <div className='container p-5 my-5'>
        <h1 className='text-main text-center'>Login Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8 m-auto w-50 bg-light shadow p-4">
              <div className="row gy-4">
              
            <div className="col-md-12">
              <label htmlFor='userEmail'>email</label>
              <input type='email' id='userEmail' name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control'/>
              {formik.errors.email && formik.touched.email?
              <p className='text-danger'>{formik.errors.email}</p>: '' 
              }
            </div>
            
            <div className="col-md-12">
              <label htmlFor='userPassword'>password</label>
              <input type='password' id='userPassword' name="password" onBlur={formik.handleBlur} value={formik.values.password}  onChange={formik.handleChange} className='form-control'/>
              {formik.errors.password && formik.touched.password?
              <p className='text-danger'>{formik.errors.password}</p>: '' 
              }
              
			        <p className="mb-3 p-3">
				        Can’t remember your current password?
				          <Link to="/forgetpassword">Forget Password.</Link>
			        </p>
            </div>
            
            {errMsg !== null ?
            <p className='text-danger'>{errMsg}</p> : ''
            }
            <div className="col-md-12 text-end my-3">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login
              {isLoading ?
              <span>
              <i className='fa-solid fa-spinner fa-spin mx-2 text-light'></i>
            </span>
                :
                ''
                }
              
              </button> 
            </div>
              <p className='text-muted'>I have account <Link to="/signin" className='text-main fw-bold'>Register</Link></p>
              </div>
            </div>
        
          </div>
        </form>
      </div>
      </>)
}
