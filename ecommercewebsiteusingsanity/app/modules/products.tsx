import Image from 'next/image'
import { createClient } from 'next-sanity'
import { client } from '@/app/lib/sanityClient';
import React from 'react';
import { urlForImage } from "@/sanity/lib/image"
import {Image as Iimage} from "sanity"
import ProductCard from '../views/productcard';

export const getProductData = async () => {

  const res = await client.fetch(`*[_type=="product"]{
    _id,
    detail,
    price,
    "size": size-> {sizes},
    description,
    title,
    "category": category->{name},
    "subCategory": subCategory->{name},
    image,
    Alternative_Image,
    "color": color->{name},
    sale_product,
    sale_price,
    new_product
  }
  `
  /*
  *[_type == "product" && category->name == "Women"] {
  _id,
  detail,
  price,
  "size": size-> {sizes},
  description,
  title,
  "category": category-> {name},
  "subCategory": subCategory-> {name},
  image,
  Alternative_Image,
  "color": color-> {name},
  sale_product,
  sale_price,
  new_product
}

  */
  
  );
  return res
}

interface IProduct {
  
  _id:string,
  title:string,
  detail:string,
  price:number,
  pSize:string,
  description:string,
  category:string,
  subCategory:string,
  image:Iimage,
  alternativeImage:Iimage[],
  color:string,
  sale_product:string,
  sale_price:string,
  new_product:string
}
export default async function Product() {
    const data:IProduct[] = await getProductData();
    
    console.log(data);
  
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between items-center '>
        {
            
         
         data.map((item,index) => (
         
          <ProductCard title={item.title} price={item.price.toString()}  ind={index} link={`/product/${item._id}`} imag={urlForImage(item.image).url()}></ProductCard>
         
         
        ))
         
        }
      </div>
      
    )
  }
  