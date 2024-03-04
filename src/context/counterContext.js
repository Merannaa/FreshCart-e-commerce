import { createContext, useState } from "react";

export let counterContext =createContext()
export default function CounterContextProvider(props){
    let x =9;
    let y=8;

    const[counter,setCounter]=useState(0)
    function changeCounter(){
        setCounter(Math.random())
    }
    return <counterContext.Provider value={{counter,changeCounter}}>
    {/* components */}
    {props.children}
    </counterContext.Provider>
}