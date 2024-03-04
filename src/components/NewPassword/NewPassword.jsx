import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import {Helmet} from 'react-helmet'


export default function NewPassword() {

    // const[isLoading,setLoading]=useState(false)
    const[errMsg,setErr]=useState(null)

    let navigate =useNavigate()
    let validationSchema=Yup.object({
      email:Yup.string().required('email is required').email('enter a vaild email'),
      newPassword:Yup.string().required('New Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter availd new password'),
    })
    async function resetNew(values){
      // console.log(values);
      
      let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values).catch((err)=>{
      // console.log(err.response.data.message);
      setErr(err.response.data.message)
      
      })
      // console.log(data);

      if(data == 'userToken'){
        navigate('/signin')
        
      }
    }
    
    let formik = useFormik({
      initialValues:{
        email:'',
        newPassword:''
      },
      // validate:validate
      // ,
      validationSchema:validationSchema,
      onSubmit: resetNew
      
    })
  return (
    <div className='container p-5 my-5'>
        <h1 className='text-main text-center'>Reset New Password</h1>
        
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
              <label htmlFor='newPassword'>New Password</label>
              <input type='password' id='newPassword' name="newPassword" onBlur={formik.handleBlur} value={formik.values.newPassword} onChange={formik.handleChange} className='form-control'/>
              {formik.errors.newPassword && formik.touched.newPassword?
              <p className='text-danger'>{formik.errors.newPassword}</p>: '' 
              }
            </div>
            
            
            {errMsg !== null ?
            <p className='text-danger'>{errMsg}</p> : ''
            }
            <div className="col-md-12 text-end my-3">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Submit
              </button> 
            </div>
              <p className='text-muted'>Now you can <Link to="/signin" className='text-main fw-bold'>login?</Link></p>
              </div>
            </div>
        
          </div>
        </form>
      </div>
  )
}
