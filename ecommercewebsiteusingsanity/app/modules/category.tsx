
import Image from 'next/image'
import { createClient } from 'next-sanity'
import { client } from '@/app/lib/sanityClient';
import React from 'react';
import { urlForImage } from "@/sanity/lib/image"
import {Image as Iimage} from "sanity"
import Link from 'next/link';
import ProductCard from '../views/productcard';


const getProductData = async (type:string) => {

  const res = await client.fetch(`*[_type=="product" && category->name == "${type}"]{
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
interface ProductProps {
    type: string;
  }
export default async function Product({ type }: ProductProps) {
    const data:IProduct[] = await getProductData(type);
    
    //const product = await useAppSelector((state)=>state.product)
    //console.log(product);
  
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between items-center '>
        {
            
         
         data.map((item,index) => (
          <ProductCard key={index} title={item.title} price={item.price.toString()}  ind={item._id} link={`/product/${item._id}`} imag={urlForImage(item.image).url()}></ProductCard>
         ))
         
        }
      </div>
      
    )
  }
  