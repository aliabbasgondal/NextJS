import Image from 'next/image'
import { createClient } from 'next-sanity'
import { client } from '@/app/lib/sanityClient';
import React, { useState } from 'react';
import { urlForImage } from "@/sanity/lib/image"
import { Image as Iimage } from "sanity"
import { toHTML } from '@portabletext/to-html'
import parse from 'html-react-parser';
import { CheckoutButton } from './checkoutButton';
import { cookies } from 'next/headers';
import { Trash2 } from 'lucide-react';
import CartListing from '../views/cartlisting';


export const getProductData = async () => {
    const user_id=cookies().get("user_id");
    
    const res = await fetch(`http://localhost:3000/api/cart?user_id=${user_id?.value as string}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        //body:JSON.stringify({})
      });
   
     
     return res.json();
}
{/*
export const removeFromCart = async (id:any) => {
    const user_id=cookies().get("user_id");
    
    const res = await fetch(`http://localhost:3000/api/cart?user_id=${user_id?.value as string}`, {
        method: "DELETE",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: id,
          
        }),
      });
   
     
     return res.json();
} */}
export const getIndividualProductData = async (p_id:any) => {
    
    const res = await client.fetch(`
  *[_type == "product" && _id == "${p_id}"][0] {
    _id,
    detail,
    price,
    "size": Size[]-> {sizes},
    description,
    title,
    "category": category-> {name},
    "subCategory": subCategory-> {name},
    image,
    Alternative_Image,
    "color": color[]-> {name},
    sale_product,
    sale_price,
    new_product
  }
  `
    );
    
    return res
}

interface IProduct {
  
    _id: string,
    title: string,
    detail: string[],
    price: number,
    pSize: string[],
    description: string,
    category: {name:string},
    subCategory: {name:string},
    image: Iimage,
    color: string[],
    sale_product: string,
    sale_price: number,
    new_product: string,
    user_id:string,
    quantity:number,
    sub_total:number,
}
export default async function Cart() {
   const data:any = await getProductData();
   
   const prodcutArray: IProduct[] = await Promise.all(
    data.map(async (pData:any) => {
      
      let productInd:IProduct = await getIndividualProductData(pData.product_id);
      productInd.quantity= pData.quantity;
      productInd.user_id=pData.user_id;
      if(productInd.sale_price != null)
      {
        productInd.sub_total = productInd.sale_price * pData.quantity;
      }else{
        productInd.sub_total = productInd.price * pData.quantity;
      }
      
      return productInd;
    })
  );
     let subTotal=0;
     let subTotalqty=0;
  
    return (
     <div className='p-0 lg:mt-16 lg:mb-16 lg:p-12 '>
        <h2 className='text-2xl font-bold mb-5'> Shopping Cart</h2>
        <div className='flex flex-col lg:flex-row justify-between gap-5 '>
        <div className='flex flex-col  gap-16 lg:w-3/4'>
            
                
                    
            {prodcutArray.map((prod:IProduct, index:number)=>(
                   <>
                    <CartListing key={index} pImage={urlForImage(prod.image).toString()} pTitle={prod.title} pName={prod.category.name} pPrice={prod.price} pSalePrice={prod.sale_price} pIndex={index} pQuantity={prod.quantity}></CartListing>
                    <span className='hidden'> {subTotalqty=subTotalqty+prod.quantity}
                    {prod.sale_price != null ?
                  subTotal=subTotal+ (prod.quantity*prod.sale_price)
                    
                    :subTotal=subTotal+ (prod.quantity*prod.price)
                   
                    }
                    </span>
                    </> 
               ))}
            
        </div>
        <div className='p-8 bg-[#fbfcff] flex flex-col gap-8 lg:w-1/4'>
            <h3 className='font-bold text-lg'>Order Summary</h3>
            <div className='flex justify-between gap-16'>
                <p>
                    Quantity
                </p>
                <span className=''>{subTotalqty} Product(s)</span>
            </div>
            <div className='flex justify-between gap-16'>
                <p>Sub total</p>
                <span>
                    ${subTotal}
                </span>
            </div>
            <div className='flex justify-between gap-16'>
                        <CheckoutButton item={prodcutArray}></CheckoutButton>       
            </div>
        </div>
        </div>
     </div>
    )
  }
  