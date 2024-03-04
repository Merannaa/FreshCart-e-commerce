import { createContext, useState } from "react";

export let userContext=createContext()

export default function UserContextProvider(myProps){
const [userToken,setToken]=useState(null)
return<userContext.Provider value={{userToken,setToken}}>
{myProps.children}
</userContext.Provider>
}