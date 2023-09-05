"use client"
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image"
import { Image as Iimage } from "sanity"
import { Trash2 } from "lucide-react";
import React,{useState} from "react";
let qty =0;
const CartListing =(props:{pImage:string, pTitle:string, pName:string,pPrice:number,pSalePrice:number,pIndex:number, pQuantity:number })=>{
    let [num, setNum] = useState(props.pQuantity);
    let incNum = () => {

        setNum(Number(num) + 1);

    };
    let decNum = () => {
        if (num > 1) {
            setNum(num - 1);
        }
    }
    let handleChange = (e: any) => {
        setNum(e.target.value);
        qty=e.target.value;
    }
    return(
        <div  key={props.pIndex} className='flex-col lg:flex-row flex gap-8'>
                   
                   
                
                   
                   
                   
        <div className='w-2/4 h-[10%] lg:w-1/4 lg:h-48 rounded-sm'>
        <Image width={100} height={100} className=' rounded-sm w-full h-full'
        src={props.pImage} alt="product images"></Image>
        </div>
        <div className='flex flex-col justify-between w-full gap-2 lg:w-3/4'>
            <div className='flex justify-between'>
                <h3 className=' font-light text-xl leading-6 text-[#212121]'>
                    {props.pTitle}
                </h3>
                
                <Trash2  className='bg-transparent border-0 list-image-none cursor-pointer'></Trash2>
            </div>
            <p className='leading-4 text-[#666] font-semibold text-base '>
                {
                    props.pName
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
                    props.pSalePrice != null ?
                    <div><p className='text-[#666] line-through'>${props.pPrice}</p> ${ props.pSalePrice}
                     
                    </div>
                    
                    : <div>${props.pPrice}
                     
                    </div>
                    }
                   
                    </span>  
                    <div>
                       
                        
                        <span onClick={decNum}  className={`text-[#212121]  p-2 mr-3 cursor-pointer border-r border-solid border-[#f1f1f1] bg-[#f1f1f1] rounded-full`}>
                            -
                        </span>
                        <input value={num} onChange={handleChange} className='border-solid border-2 border-black h-5 w-5 text-center items-center'></input>
                        
                        <span onClick={incNum}  className='text-[#212121] p-2 ml-3 cursor-pointer border-r border-solid border-[#f1f1f1] bg-[#f1f1f1] rounded-full'>
                            +
                        </span>
                        
                    </div>
            </div>
        </div>
        
    </div>

    );
}
export default CartListing