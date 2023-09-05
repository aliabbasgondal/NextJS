"use client";
import React, { FC, useState,  } from "react";
import {useRouter } from 'next/router'
import {ShoppingCart} from "lucide-react"
import { redirect } from 'next/navigation'
import IncrementDecrementNum from "../shared/quantityincrementdecrement";
import { useAppDispatch } from "@/redux/store";
import { Product } from "../../../interfaces";
import {Toaster, toast} from "react-hot-toast"

import { stringify } from "querystring";
import { cartAction } from "@/redux/features/cartSlice";
import { cookies } from "next/headers";
/*type iProps={
  product:Product;
  qty:number;

}*/
export const AddToCartPage: FC<{ item: any }> = ({ item }) => {
  let [num, setNum] = useState(1);
  const dispatch = useAppDispatch();
 
  const getDatafromDB = async () => {
    const res = await fetch(`/api/cart?user_id=${item.user_id as string}`);
    if (!res.ok) {
      throw new Error("Failed to Fetch Data From API");
    }
    const data = await res.json();
    return data;
  };
  const HandleAddToCart = async () => {
    try {
      
      const res = await fetch(`/api/cart`, {
        method: "POST",
        cache: "no-cache",
        
        body: JSON.stringify({
          product_id: item._id,
          quantity: num,
        }),
      });
  
      if (!res.ok) {
        console.log(res, 'error message');
        throw new Error('Failed to add item to cart');
      }
      
      else{return await res.json();}
      
      //useRouter().push('/cart'); // Return the result for further handling
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };
  const handleCart = async()=>{
    try{
      
      if(!item.user_id){
      await HandleAddToCart();
      }
      else
      {
        const cartData =await getDatafromDB();
        console.log(cartData);

        const existingItem = cartData.cartItems.length != 0? cartData.cartItems.find(
          (cartitem: any) => item._id === cartitem.product._id
        ): 0;
        if(existingItem==0 || !existingItem){
        
         
        await HandleAddToCart();
        } else{
          const newQuantity = existingItem.quantity + num;
          const newTotalPrice = item.sale_price != null ? newQuantity*item.sale_price:newQuantity*item.price;
          const res = await fetch(`/api/cart`,{
            method: "PUT",
          cache: "no-cache",
          
          body: JSON.stringify({
            product_id: item._id,
            quantity: newQuantity,
          }),
          })
          console.log(res);
          if(!res.ok){
            throw new Error("Failed to update data");
          }
        }
        

      }
     /* if(!item.user_id){
        await HandleAddToCart();
      }else{
      const cartData =await getDatafromDB();
      console.log(cartData);
      if(cartData.cartItems.length<0){await HandleAddToCart();}else{
      const existingItem = cartData.cartItems.find((pitem:any)=> item._id === pitem.product_id )
      
      if(existingItem){
        const newQuantity = existingItem.quantity + num;
        const newTotalPrice = item.sale_price != null ? newQuantity*item.sale_price:newQuantity*item.price;
        const res = await fetch('/api/cart',{
          method: "PUT",
        cache: "no-cache",
        
        body: JSON.stringify({
          product_id: item._id,
          quantity: newQuantity,
        }),
        })
        console.log(res);
        if(!res.ok){
          throw new Error("Failed to update data");
        }
        else{
          await HandleAddToCart();
        }
      }
      }
      }*/
    }catch(error){
        console.log(error);
    }
  }
const addToCart= async ()=>{
  
  toast.promise(handleCart(),{
    loading:"Adding item to cart",
    success:"Item added to cart",
    error:"Something went wrong."
  });
 dispatch(cartAction.addToCart({product: item, quantity:num,}))
}
    
    return (
        <>
            <div className='flex gap-8'>
                <h4>Quantity:</h4>
                <IncrementDecrementNum num={num} setNum={setNum}></IncrementDecrementNum>
            </div>
            <div className="flex items-center gap-4">
            <button onClick={addToCart} className='text-sm w-[40%] font-semibold leading-4 pt-[10px] pb-[10px] flex items-center justify-center gap-2 text-white bg-[#212121]'><ShoppingCart></ShoppingCart>Add to Cart</button>
            <Toaster></Toaster>
           
            {
                item.sale_price != null ?
                <span>
                     <p className='font-bold  text-3xl text-[#888] leading-8 mt-2 line-through'>${item.price}</p>
                    <p className='font-bold text-3xl leading-8 text-[#212121] mt-2'>${item.sale_price}</p>
                    </span>
                    : 
                    <p className='font-bold text-3xl leading-8 text-[#212121] mt-2'>${item.price}</p>
            }
            </div>
        </>
    );
}

