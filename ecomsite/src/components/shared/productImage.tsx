"use client"
import React, { useState } from 'react';
import { urlForImage } from '../../../sanity/lib/image'
import { Image as Iimage } from "sanity"
import Image from 'next/image'

interface Color { name: string; }
interface Size { sizes: string }

interface IProduct {
    _id: string,
    title: string,
    detail: string[],
    price: number,
    size: Size[],
    description: string,
    category: { name: string },
    subCategory: { name: string },
    image: Iimage,
    Alternative_Image: Iimage[],
    color: Color[],
    sale_product: string,
    sale_price: string,
    new_product: string
}

const ProductMainImage = ({ data }: { data: IProduct }) => {
    const [selectedImage, setSelectedImage] = useState('');


    
    return (
        <div className='flex flex-col-reverse md:flex-row flex-1 md:flex-[2] gap-8'>
            <div className='flex flex-row md:flex-col gap-4'>
                {data.Alternative_Image != null ?
                    data.Alternative_Image.map((aImage: Iimage, index: number) => (
                        
                        <div key={index} className=' cursor-pointer'
                        onClick={() => {setSelectedImage(urlForImage(aImage).url())}}
                        >
                        <Image
                            
                            width={100}
                            height={100}
                            className='cursor-pointer w-[100px] h-[100px]'
                            src={urlForImage(aImage).url()}
                            
                            alt="product alternative images"
                        />
                        </div>
                    ))
                    : ''}
                    <div key={50} className=' cursor-pointer'
                    
                    onClick={() => {setSelectedImage(urlForImage(data.image).url())}}
                    >
                <Image
                    width={100}
                    height={100}
                    
                    className='cursor-pointer w-[100px] h-[100px]'
                    src={urlForImage(data.image).url()}
                    
                    alt="product images"
                />
                </div>
            </div>
            <div className='w-full md:w-[80%] h-[100%] max-w-[1000] max-h-[1000]'>
                <Image
                    width={380}
                    height={400}
                    className='w-[100%] h-[100%] min-w-[300px] min-h-[300px]'
                    src={selectedImage ? selectedImage : urlForImage(data.image).url()}
                    alt="product images"
                />
            </div>
        </div>
    );
}

export default ProductMainImage;
