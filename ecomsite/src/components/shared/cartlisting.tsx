"use client"
import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image'

import { Trash2 } from "lucide-react";
import React,{useState} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast, Toaster } from "react-hot-toast";
import { cartAction } from "@/redux/features/cartSlice";


const CartListing = (props:{productCart:any, pind:number })=>{
    let [num, setNum] = useState(props.productCart.quantity);
    const disptach =useAppDispatch();
    const handleCartQuantity=async (newQty:number)=>{
        const newTotalPrice =  props.productCart.product?  props.productCart.product.sale_price != null ? newQty*props.productCart.product.sale_price:newQty*props.productCart.product.price:  props.productCart.sale_price != null ? newQty*props.productCart.sale_price:newQty*props.productCart.price
       ;
        try{
        const res = await fetch(`/api/cart`,{
          method: "PUT",
        cache: "no-cache",
        
        body: JSON.stringify({
          product_id: props.productCart.product?props.productCart.product._id:props.productCart._id,
          quantity: newQty,
        }),
        })
        
        if(!res.ok){
          throw new Error("Failed to update data");
        }
    }
    catch(error){
        console.log((error as { message: string }).message);
    }

    }
 const deleteItem= async()=>{
    try {
   await fetch(`/api/cart`,{
      method: "DELETE",
    cache: "no-cache",
    
    body: JSON.stringify({
      product_id: props.productCart.product?props.productCart.product._id:props.productCart._id
      
    }),
    })
    
   
}
catch(error){
    console.log((error as { message: string }).message);
}
    
}
    let incNum = () => {
toast.promise(handleCartQuantity(num+1),{
    loading:"Incrase Quantity",
    success:"Quantity Increased",
    error:"Someting Went wrong",
})
        setNum(Number(num) + 1);
        disptach(cartAction.addToCart({product: props.productCart.product?props.productCart.product:props.productCart, quantity:1}))

    };
    let decNum = () => {
        if (num > 1) {
            toast.promise(handleCartQuantity(num-1),{
                loading:"Decrementing Quantity",
                success:"Quantity Decremented",
                error:"Someting Went wrong",
            })
            setNum(num - 1);
            disptach(cartAction.decrementCartProduct(props.productCart.product?props.productCart.product._id:props.productCart._id));
        }
    }
   
    const removeItem=()=>{
        toast.promise(deleteItem(),
        {
            loading:"Deleting Item",
            success:"Item Deleted",
            error:"Someting Went wrong",
        });
        disptach(cartAction.removeProduct(props.productCart.product?props.productCart.product._id:props.productCart._id))
    }
 
    console.log(props);
    return(
        <div  key={props.pind} className='flex-col lg:flex-row flex gap-8'>
                   
                   
                
                   
                   
                   
        <div className='w-2/4 h-[10%] lg:w-1/4 lg:h-48 rounded-sm'>
        <Image width={100} height={100} className=' rounded-sm w-full h-full'
        src={urlForImage(props.productCart.product?props.productCart.product.image:props.productCart.image).toString()} alt="product images"></Image>
        </div>
        <div className='flex flex-col justify-between w-full gap-2 lg:w-3/4'>
            <div className='flex justify-between'>
                <h3 className=' font-light text-xl leading-6 text-[#212121]'>
                    {props.productCart.product?props.productCart.product.title:props.productCart.title}
                </h3>
                
                <Trash2 onClick={removeItem}  className='bg-transparent border-0 list-image-none cursor-pointer'></Trash2>
            </div>
            <p className='leading-4 text-[#666] font-semibold text-base '>
                {
                    props.productCart.product?props.productCart.product.category.name:props.productCart.category.name
                }
            </p>
            <p className='leading-4 text-[#212121] font-semibold text-base'>
                Delivery Estimation
            </p>
            <p className='leading-4 text-[#ffc700] font-semibold text-base'>
                5 Working Days
            </p>
            <div className='flex justify-between'>
                  
                    <span className='leading-4 text-[#212121] text-xl font-bold'>
                    {
                        props.productCart.product?
                        props.productCart.product.sale_price != null ?
                    <div><p className='text-[#666] line-through'>${props.productCart.product.price}</p> ${ props.productCart.product.sale_price}
                     
                    </div>
                    
                    : <div>${props.productCart.product.price}
                     
                    </div>
                        
                        :
                    props.productCart.sale_price != null ?
                    <div><p className='text-[#666] line-through'>${props.productCart.price}</p> ${ props.productCart.sale_price}
                     
                    </div>
                    
                    : <div>${props.productCart.price}
                     
                    </div>
                    }
                   
                    </span>  
                    <div>
                       
                        
                        <span onClick={decNum}  className={`text-[#212121]  p-2 mr-3 cursor-pointer border-r border-solid border-[#f1f1f1] bg-[#f1f1f1] rounded-full`}>
                            -
                        </span>
                        <input value={num}  className='border-solid border-2 border-black h-5 w-5 text-center items-center'></input>
                        
                        <span onClick={incNum}  className='text-[#212121] p-2 ml-3 cursor-pointer border-r border-solid border-[#f1f1f1] bg-[#f1f1f1] rounded-full'>
                            +
                        </span>
                        
                    </div>
            </div>
        </div>
        <Toaster />
        
    </div>

    );
}
export default CartListing