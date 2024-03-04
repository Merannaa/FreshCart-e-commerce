import axios from "axios";
import { createContext, useState } from "react";

export let wishlistContext=createContext()

export default function WishlistContextProvider(props){
    
    const[wishlistNumber,setWishNumber]=useState(0)
    const[wishlist,setWishlist]=useState([])

    let BaseUrl=`https://ecommerce.routemisr.com`;
    let header ={
        token:localStorage.getItem('userToken')
    }
    function addToWishlist(id){
        return axios.post(`${BaseUrl}/api/v1/wishlist`,
        {
            productId:id
        },
        {
            headers:header
        })
    }
    async function getWish(){
        let data = await getWishlist()
        if(data?.data?.status == "success"){
            setWishlist(data?.data?.data)
            setWishNumber(data?.data?.count)
        }else{
            setWishlist([])
            setWishNumber(0)
        }
    }

    function getWishlist(){
        return axios.get(`${BaseUrl}/api/v1/wishlist`,
        {
            headers:header
        })
    }
    function deleteWishlist(id){
        return axios.delete(`${BaseUrl}/api/v1/wishlist/${id}`,
        {
            headers:header
        })
    }
    return <wishlistContext.Provider value={{getWish,wishlist,setWishlist,addToWishlist,getWishlist,deleteWishlist,wishlistNumber,setWishNumber}}>
    {props.children}
</wishlistContext.Provider>
}
