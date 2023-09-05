"use client"
import {FC} from "react"
import { Image as Iimage } from "sanity"
import getStipePromise from "@/app/lib/stripe"
interface IProduct {
  
    id: string,
    title: string,
    price: number,
    pSize: string,
    image: Iimage,
    color: string,
    sale_price: string,
    qunatity:number,
    user_id:string,
    
};
export const CheckoutButton: FC<{item:any}> =({item})=>{
    
const handleCheckoutBtn = async ()=>{
    
    const stripe = await getStipePromise();
    const response = await fetch("/api/stripe-session/",{
        
        method:"POST",
        headers:{"Content-Type":"application/json"},
        cache:"no-cache",
        body:JSON.stringify({item})
    });
    const data = await response.json();
    console.log(data.session,"session");
    if (data.session) {
        
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
}
return(
    
        <button className=" w-full font-semibold leading-5 bg-[#212121] pt-3 pb-3 flex items-center justify-center gap-2 text-white " onClick={handleCheckoutBtn}>Checkout</button>
    
)
}