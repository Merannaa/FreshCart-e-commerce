import React from 'react'
import { jwtDecode } from "jwt-decode";
import {Helmet} from 'react-helmet'

export default function Profile() {
  let encodedToken = localStorage.getItem('userToken'); 
  let decodedToken = jwtDecode(encodedToken);
  console.log(decodedToken);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" content="Profile" />
        <title>UserProfile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1
        className="text-main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        Hello {decodedToken.name}!
      </h1>

    </>
  );
}
