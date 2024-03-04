import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext=createContext()

export default function CartContextProvider(props){
    
    const[cartNumber,setCartNumber]=useState(0)
    const[cartPrice,setPrice]=useState([])
    


    let BaseUrl=`https://ecommerce.routemisr.com`;
    let header ={
        token:localStorage.getItem('userToken')
    }
    
    
    async function addToCart(id){
        try{
            const res = await axios.post(`${BaseUrl}/api/v1/cart`,
            {
                productId:id
            },
            {
                headers:header
            });
            return res
        } catch (err){
            return  err;
        }
    }
    
    async function getCart(){
        try{
            const res = await axios.get(`${BaseUrl}/api/v1/cart`,
            {
                headers:header
            });
            localStorage.setItem('userid', res.data.data.cartOwner)
            return res
        } catch (err){
            return  err;
        }
    }


    async function updateCart(id,count){
        try{
            const res = await axios.put(`${BaseUrl}/api/v1/cart/${id}`,
            {
                count:count
            },
            {
                headers:header
            });
        return res
    } catch (err) {
        return err;
    }
    }

    async function deleteCart(id){
        try{
            const res = await axios.delete(`${BaseUrl}/api/v1/cart/${id}`,
            {
                headers:header
            });
        return res;
        } catch (err) {
            return err;
        }
    }
    async function clearCartItem(){
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {
                headers:header
            });
            return res
        } catch (err){
            return err;
        }
        
    }
    function checkoutPayment(id,formData){
        return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        {
            shippingAddress:formData
        },
        {
            headers:header
        })
    }
    function getUserOrder(userid){
        return axios.get(`${BaseUrl}/api/v1/orders/user/${userid}`,
        {
            headers:header
        })
    }
    
    return <cartContext.Provider value={{cartPrice,setPrice,addToCart,cartNumber,setCartNumber,getCart,updateCart,deleteCart,checkoutPayment,getUserOrder,clearCartItem}}>
        {props.children}
    </cartContext.Provider>
}