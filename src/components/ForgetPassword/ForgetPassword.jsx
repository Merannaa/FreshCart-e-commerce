import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import {Helmet} from 'react-helmet'


export default function ForgetPassword() {

  // console.log(x);

    const[isLoading,setLoading]=useState(false)
    const[errMsg,setErr]=useState(null)

    let navigate =useNavigate()
    let validationSchema=Yup.object({
      email:Yup.string().required('email is required').email('enter a vaild email'),
    })

    async function forget(values){
      // console.log(values);
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values).catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message)
      setLoading(false)
      })
      console.log(data);
      if(data.statusMsg == 'success'){
        navigate('/verifypassword')
        setLoading(false)
      }
    }
    let formik = useFormik({
      initialValues:{
        email:'',
      },
      // validate:validate
      // ,
      validationSchema:validationSchema,
      onSubmit:forget
      
    })
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" content="ForgetPassword" />
        <title>ForgetPassword</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
    <div className='container p-5 my-5'>
        <h1 className='text-main text-center'>Forget Password</h1>
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
            
            
            {errMsg !== null ?
            <p className='text-danger'>{errMsg}</p> : ''
            }
            <div className="col-md-12 text-end my-3">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Send Code
              {isLoading ?
              <span>
              <i className='fa-solid fa-spinner fa-spin mx-2 text-light'></i>
            </span>
                :
                ''
                }
              
              </button> 
            </div>
              <p className='text-muted'>Now you can <Link to="/signin" className='text-main fw-bold'>login?</Link></p>
              </div>
            </div>
        
          </div>
        </form>
      </div>
      </>)
}
