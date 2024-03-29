import React from 'react'
import {Helmet} from 'react-helmet'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/FooterPage'

export default function NotFound() {
  return (<>
  <Helmet>
          <meta charSet="utf-8" content="NotFound" />
          <title>NotFound</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
  
    <div>
      <div className=' d-flex vh-100 justify-content-center align-items-center fw-bold'>
      NotFound
      </div>
    </div>
    </>)
}
