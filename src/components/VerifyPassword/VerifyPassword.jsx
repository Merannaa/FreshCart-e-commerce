import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import { userContext } from '../../context/TokenContext';
import {Helmet} from 'react-helmet'

export default function ResetPassword() {
  let {userToken,setToken}=useContext(userContext)
  // console.log(x);

    const[isLoading,setLoading]=useState(false)
    const[errMsg,setErr]=useState(null)

    let navigate =useNavigate()
    let validationSchema=Yup.object({
      resetCode:Yup.string().required('code is required'),
    })

    async function reset(values){
      // console.log(values);
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values).catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message)
      setLoading(false)
      })
      console.log(data);
      if(data.status == 'Success'){
        navigate('/resetnewpassword')
        setLoading(false)
      }
    }
    let formik = useFormik({
      initialValues:{
        resetCode:'',
      },
      // validate:validate
      // ,
      validationSchema:validationSchema,
      onSubmit:reset
      
    })
  return (<>
  <Helmet>
        <meta charSet="utf-8" content="VerifyCode" />
        <title>VerifyCode</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
 
    <div className='container p-5 my-5'>
        <h1 className='text-main text-center'>Verify Code</h1>
        
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8 m-auto w-50 bg-light shadow p-4">
              <div className="row gy-4">
              
            <div className="col-md-12">
              <label htmlFor='resetCode'>Reset Code</label>
              <input type='text' id='resetCode' name="resetCode" onBlur={formik.handleBlur} value={formik.values.resetCode} onChange={formik.handleChange} className='form-control'/>
              {formik.errors.resetCode && formik.touched.resetCode?
              <p className='text-danger'>{formik.errors.resetCode}</p>: '' 
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
