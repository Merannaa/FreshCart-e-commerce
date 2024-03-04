import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../context/wishlistContext'
import toast from 'react-hot-toast'


export default function WishlistIcon({productID}) {
  let{getWish,wishlist,addToWishlist,setWishNumber,deleteWishlist,setWishlist}=useContext(wishlistContext)
  const[isHeart,setHeart]=useState(false)

  async function addToMyWishList(){
    let {data}= await addToWishlist(productID)
    if(data.status == 'success'){
      // console.log('hi');
      toast.success(data.message);
      setHeart(true)
      getWish()
      setWishNumber(data.data.count)
      setWishlist(data?.data?.data)
    }
  }
  async function removeWishlist(id){
    let data=await deleteWishlist(productID)
    if (data?.data?.count !== 0){
      setWishlist(data.data.data);
      setWishNumber(data.data.count)
      setHeart(false)
      getWish()
    }else{
      setWishlist([])
      setWishNumber(0)
      setHeart(false)
      getWish()
    }
    if (data.data.status === "success") {
      toast.success("removed successfully from your Whishlist")
    }
  }

  function ToggleWishlist(){
    if(isHeart){
      removeWishlist()
    }else{
      addToMyWishList()
    }
  }

useEffect(()=>{
  let isFound = wishlist?.filter(product => productID==product._id)
  if(isFound?.length){
    setHeart(true)
  }else{
    setHeart(false)
  }
},[])
  return (
    <i onClick={ToggleWishlist} className={`${ isHeart ? 'fa-solid': 'fa-regular'} text-main fa-heart top-0 end-0 position-absolute m-4 fs-5`}>
    </i>
  )
}
