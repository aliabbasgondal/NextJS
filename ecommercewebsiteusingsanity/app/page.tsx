import Image from 'next/image'
import { createClient } from 'next-sanity'
import { client } from './lib/sanityClient';
import React from 'react';

import Product from './modules/products';
import Homepagedata from './modules/homepagebody';
import Productdetail from './modules/productDetail';
import Cart from './modules/cart';
import Checkout from './modules/checkout';
export default async function Home() {
  
  
  

  return (
   
    
    <Homepagedata></Homepagedata>
    
  )
}
