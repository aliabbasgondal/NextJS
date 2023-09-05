"use client"
import React, { useState } from 'react';

import { Image as Iimage } from "sanity"
import { Product } from '../../../interfaces';

//import { cookies } from 'next/headers';
import { ShoppingCart } from 'lucide-react';
import { CheckoutButton } from '@/components/shared/CheckoutButton';
import StartShopping from '@/components/shared/StartShopping';
import Wrapper from '@/components/shared/Wrapper';
import CartListing from '@/components/shared/cartlisting';
import { useAppSelector } from '@/redux/store';
import { selectIsLoading } from '@/redux/features/cartSlice';





interface IProduct {
  
    _id: string,
    title: string,
    detail: string[],
    price: number,
    size: string[],
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
const LoadedCartData = () => {
  
  const totalQty= useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice= useAppSelector((state) => state.cart.totalAmount);
  const cartItems= useAppSelector((state) => state.cart.items);
  



 //conso

   console.log(cartItems);
  if ( cartItems.length > 0) {
    return (

      <Wrapper>

     <div className='p-0 lg:mt-16 lg:mb-16 lg:p-12 '>
        <h2 className='text-2xl font-bold mb-5'> Shopping Cart</h2>
        <div className='flex flex-col lg:flex-row justify-between gap-5 '>
        <div className='flex flex-col  gap-16 lg:w-3/4'>
            
                
                    
            {cartItems.map((prod:Product, index:number)=>(

                   <>
                    <CartListing productCart={prod}  pind={index} key={index}></CartListing>
                    
                    </> 
               ))}
            
        </div>
        <div className='p-8 bg-[#fbfcff] flex flex-col gap-8 lg:w-1/4'>
            <h3 className='font-bold text-lg'>Order Summary</h3>
            <div className='flex justify-between gap-16'>
                <p>
                    Quantity
                </p>
                <span className=''>{ totalQty} Product(s)</span>
            </div>
            <div className='flex justify-between gap-16'>
                <p>Sub total</p>
                <span>
                    ${ totalPrice}
                </span>
            </div>
            <div className='flex justify-between gap-16'>
                        <CheckoutButton item={cartItems}></CheckoutButton>       
            </div>
        </div>
        </div>
     </div>
     </Wrapper>
    )
            }
            else{
              return (
                <Wrapper>
                  <h3>Shopping Cart</h3>
          
                  <div className="flex flex-col w-full gap-10 h-full justify-center items-center">
                    <ShoppingCart size={200} />
                    <h1>Your shopping bag is empty</h1>
                    <StartShopping />
                  </div>
                </Wrapper>
              );
            }
            
  }
  const CartDataLoadingFromApi = () => {
    return (
      <Wrapper>
        <div className="flex justify-center items-center w-full h-40">
          <h1>Loading Data</h1>
        </div>
      </Wrapper>
    );
  };
export default function Cart() {

  const isLoading = useAppSelector(selectIsLoading);

  return <>{isLoading ? <CartDataLoadingFromApi /> : <LoadedCartData />}</>;
}
