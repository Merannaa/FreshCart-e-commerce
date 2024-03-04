import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import {Helmet} from 'react-helmet'


export default function Signup() {
//custom valdiation
  // function validate(values){
  //   let errors={

  //   }
  //   if (!values.name){
  //     errors.name='name is required'
  //   }else if (values.name.length < 3){
  //     errors.name='min 3 letters'
  //   }else if (values.name.length > 10){
  //     errors.name='maximum 10 letters'
  //   }


  //   if(!values.phone){
  //     errors.phone='phone is required'
  //   }else if(!/^0[1250][0-9]{8}$/.test(values.phone)){
  //     errors.phone='enter a vaild phone number'
  //   }

  //   if(!values.email){
  //     errors.email='email is required'
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email='enter availd email'
  //   }

  //   if(!values.password){
  //     errors.password='password is required'
  //   }else if (!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
  //     errors.password='enter availd password'
  //   }

  //   if(!values.rePassword){
  //     errors.rePassword='confirm rePassword is required'
  //   }else if (values.password !== values.rePassword){
  //     errors.rePassword='not matched'
  //   }
  //   return errors;
  // }
  const[isLoading,setLoading]=useState(false)
  const[errMsg,setErr]=useState(null)
  let navigate =useNavigate()
  let validationSchema=Yup.object({
    name:Yup.string().min(3,'at least 3 letter').max(15,'maximum is 15 letters').required('name is required'),
    email:Yup.string().required('email is required').email('enter a vaild email'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone is not vaild'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter availd password'),
    rePassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],'not matched')
  })

  async function signUp(values){
    // console.log(values);
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
    console.log(err.response.data.message);
    setErr(err.response.data.message)
    setLoading(false)
    })
    console.log(data);
    if(data.message == 'success'){
      navigate('/signin')
      setLoading(false)
    }
  }
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    // validate:validate
    // ,
    validationSchema:validationSchema,
    onSubmit:signUp
    
  })
  
  return (<>
  <Helmet>
        <meta charSet="utf-8" content="Signup" />
        <title>Signup</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className='container my-5'>
      <h1 className='text-main text-center'>Register Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-4">
            <div className="row gy-4">
            <div className="col-md-12">
            <label htmlFor='userName'>name</label>
            <input type='text' id='userName' name="name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} className='form-control'/>
            {formik.errors.name && formik.touched.name?
            <p className='text-danger'>{formik.errors.name}</p>: ''
          }
          </div>
          <div className="col-md-12">
            <label htmlFor='userEmail'>email</label>
            <input type='email' id='userEmail' name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control'/>
            {formik.errors.email && formik.touched.email?
            <p className='text-danger'>{formik.errors.email}</p>: '' 
            }
          </div>
          <div className="col-md-12">
            <label htmlFor='userPhone'>Phone</label>
            <input type='tel' id='userPhone' name="phone" onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} className='form-control'/>
            {formik.errors.phone && formik.touched.phone?
            <p className='text-danger'>{formik.errors.phone}</p>: '' 
            }
          </div>
          <div className="col-md-12">
            <label htmlFor='userPassword'>password</label>
            <input type='password' id='userPassword' name="password" onBlur={formik.handleBlur} value={formik.values.password}  onChange={formik.handleChange} className='form-control'/>
            {formik.errors.password && formik.touched.password?
            <p className='text-danger'>{formik.errors.password}</p>: '' 
            }
          </div>
          <div className="col-md-12">
            <label htmlFor='userConfirm'>repassword</label>
            <input type='password' id='userConfirm' name="rePassword" onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} className='form-control'/>
            {formik.errors.rePassword && formik.touched.rePassword?
            <p className='text-danger'>{formik.errors.rePassword}</p>: '' 
            }
          </div>
          {errMsg !== null ?
          <p className='text-danger'>{errMsg}</p> : ''
          }
          <div className="col-md-12 text-end my-3">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register
            {isLoading ?
            <span>
            <i className='fa-solid fa-spinner fa-spin mx-2 text-light'></i>
          </span>
              :
              ''
              }
            
            </button>
          </div>
            <p className='text-muted'>I have account <Link to="/signin" className='text-main fw-bold'>login</Link></p>
            </div>
          </div>
      
        </div>
      </form>
    </div>
    </>)
}
