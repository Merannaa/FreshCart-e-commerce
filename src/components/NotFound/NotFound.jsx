import React from 'react'
import {Helmet} from 'react-helmet'

export default function NotFound() {
  return (<>
  <Helmet>
          <meta charSet="utf-8" content="NotFound" />
          <title>NotFound</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
  
    <div>
      NotFound
    </div>
    </>)
}
