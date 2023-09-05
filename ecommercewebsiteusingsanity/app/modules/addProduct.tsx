"use client";
import React, { FC, useState,  } from "react";
import {useRouter } from 'next/router'
import {ShoppingCart} from "lucide-react"
import { redirect } from 'next/navigation'
import IncrementDecrementNum from "../views/quantityincrementdecrement";
import { useAppDispatch } from "../redux/store";
import { cartAction } from "../redux/features/cartSlice";
import { Product } from "@/interfaces";
import {Toaster, toast} from "react-hot-toast"

import { stringify } from "querystring";
type iProps={
  product:Product;
  qty:number;

}
export const ProductCard: FC<{ item: any }> = ({ item }) => {
  let [num, setNum] = useState(1);
  const dispatch = useAppDispatch();
  const getDatafromDB = async()=>{
    
    const res = await fetch(`/api/cart?user_id=${item.user_id as string}`, {
      method: "GET",
      cache: "no-cache",
      //body:JSON.stringify({})
    });
    if(!res.ok){
      throw new Error("Fail to fetch data");

    } else{
      console.log(res, "result from db");
      return await res.json();}
  
  }
  
  const HandleAddToCart = async () => {
    try {
      
      const res = await fetch("/api/cart", {
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
      console.log("i am here");
      const cartData =await getDatafromDB();
      console.log("data from db", cartData);
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
    }catch(error){
        console.log(error);
    }
  }
const addToCart= ()=>{
  
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