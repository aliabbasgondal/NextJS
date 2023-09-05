import Image from 'next/image'
import { createClient } from 'next-sanity'
import { client } from '@/app/lib/sanityClient';
import React from 'react';
import { urlForImage } from "@/sanity/lib/image"
import { Image as Iimage } from "sanity"
import { toHTML } from '@portabletext/to-html'
import parse from 'html-react-parser';
import { ProductCard } from './addProduct';
import ProductMainImage from '../views/productImage';
import { cookies } from "next/headers";

export const getProductData = async (productId: any) => {

    const res = await client.fetch(`
  *[_type == "product" && _id == "${productId}"][0] {
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
interface color { name: string; }
interface size { sizes: string }

interface IProduct {

    _id: string,
    title: string,
    detail: string[],
    price: number,
    size: size[],
    description: string,
    category: { name: string },
    subCategory: { name: string },
    image: Iimage,
    Alternative_Image: Iimage[],
    color: color[],
    sale_product: string,
    sale_price: string,
    new_product: string,
    user_id:string,
}
export default async function Productdetail(productId: any) {

    const data: IProduct = await getProductData(productId.id);
    const user_id=cookies().get("user_id");
    data.user_id=user_id?.value as string;

    return (
        <div className='bg-[#fcfcfc] pt-16 pb-16 md:pl-32 md:pr-32 p-2'>


            {
                <div className=''>
                    <div className='flex lg:flex-row flex-col justify-between'>
                        <div className=' flex flex-col-reverse  md:flex-row flex-1 md:flex-[2]  gap-8'>
                            <ProductMainImage data={data}></ProductMainImage>
                          
                        </div>

                        <div className='flex flex-col flex-1 pl-0 lg:pl-2 gap-10 mt-16'>

                            <div>
                                <h3 className='font-normal text-3xl leading-8 tracking-wider text-[#212121] '>{data.title}</h3>
                                <span className='font-semibold text-xl opacity-30'>{data.subCategory.name}</span>
                            </div>
                            <div className=''>
                                <label className='text-[#212121] font-bold text-sm leading-4 -tracking-tighter'>
                                    SELECT SIZE
                                </label>
                                <ul className='flex gap-4 mt-1'>
                                    {
                                        data.size != null ?
                                            data.size.map((size: size, index1: any) => (
                                                <li key={index1} className='w-[40px] h-[40px] flex justify-center items-center border-r-[50%] uppercase rounded-full bg-gray-300 cursor-pointer text-base font-bold leading-4 tracking-wider text-[#666]'>{size.sizes}</li>
                                            )) : ''
                                    }
                                </ul>
                                <label className='text-[#212121] font-bold text-sm leading-4 -tracking-tighter'>
                                    SELECT Color
                                </label>
                                <ul className='flex gap-4 mt-1'>
                                    {
                                        data.color != null ?
                                            data.color.map((color: color, index2: any) => (
                                                <li key={index2} style={{backgroundColor:color.name}} className='w-[40px] h-[40px] border-2 border-solid border-neutral-500 flex justify-center items-center border-r-[50%] cursor-pointer text-base leading-4 tracking-wider text-[#666]'></li>
                                            )) : ''
                                    }
                                </ul>
                            </div>

                            
                                <ProductCard item={data}></ProductCard>

                               
                            
                        </div>


                    </div>

                    <div className='flex bg-white flex-col mt-16 pl-2 pr-2 md:p-16 pt-8 pb-8 gap-8'>
                        <div className=' flex z-10 border-b-2 border-solid border-[#c4c4c4] relative w-full h-24'>
                            <div className='flex z-10 font-extrabold text-6xl md:text-8xl leading-10 text-[#f2f3f7] opacity-70 h-[100%] w-[100%]'>
                                Overview
                            </div>
                            <h2 className='font-bold text-2xl leading-6 tracking-wider text-[#212121] pb-12 z-10 t-[45%] absolute'>Product Information</h2>
                        </div>
                        <div className='flex flex-col'>
                        <div className='flex md:flex-row flex-col z-10 min-w-full md:min-w-[160px]'>
                            <h4 className='flex mb-3  min-w-[160px] font-bold text-base leading-5 tracking-wider text-[#666]'>
                             Product Details
                             </h4>
                             <p className='font-light text-base tracking-wider text-justify leading-7'>
                             {data.description}
                             </p>
                        </div>
                        <div className='flex mt-3 md:flex-row flex-col z-10 flex-1'>
                        <h4 className='mb-3 font-bold text-base leading-5 tracking-wider text-[#666] flex min-w-[160px]'>
                             Product Care
                             </h4>
                             <span className='flex font-light text-base tracking-wider text-justify leading-7'>
                            {
                                parse( toHTML(data.detail.map((items:any)=>(items)), {
                                  components: {
                                    
                                  },
                                }))
                                
                            }
                            </span>
                        </div>
                        </div>
                    </div>
                </div>

            }


        </div>

    )
}
