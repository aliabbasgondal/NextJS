"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Plus, Search, ShoppingCart, Terminal, X } from "lucide-react";
import { client } from "@/app/lib/sanityClient";
import { urlForImage } from "@/sanity/lib/image";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAppSelector } from "../redux/store";

export const getHeaderData = async () => {
  const res = await client.fetch(
    `*[_type == "header"][0]{
      logo,
      "menu": items[] {
        item,
        menuUrl
      }
    }`
  );
  return res;
};

export default async function Header() {
  const totalQty= useAppSelector((state) => state.cart.totalQuantity);
  
  const data = await getHeaderData();  
  const handleClick = (status:string) => () => {
          const element = document.getElementById("mobileNav") as HTMLElement;
          
          if (status == 'hidden') {
            element.classList.remove("flex-row");
            element.classList.add(`${status}`); // Change the display value to 'flex'
          }else{
            element.classList.remove("hidden");
            element.classList.add(`${status}`); // Change the display value to 'flex'
          }
        }
    


  
 
 
  return (
    <header className="md:pl-16 md:pr-16 pl-4 pr-4">
      <nav className="py-5 flex justify-between items-baseline sm:items-center gap-x-10">
        <Link className="max-w-xs"  href="/">
          
            <Image
              width={200}
              height={125}
              src={urlForImage(data.logo).url()}
              alt="Site Logo"
              className="cursor-pointer"
            />
          
        </Link>
        <ul className=" hidden sm:flex gap-x-10 justify-center items-center">
                {data.menu.map((mItem: any) => (
                  <li key={mItem.menuUrl}>
                    <Link 
                      className="text-lg"
                      href={`/shop${mItem.menuUrl}`}
                    >
                      {mItem.item}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link key={100}  href="/shop"> All Products</Link>
                </li>
              </ul>
              <div className="sm:flex hidden justify-center items-center -space-x-10">
                <Input className="max-w-sm" ></Input>
                <button>
                  <Search className="" ></Search>
                </button>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-300 sm:flex hidden justify-center items-center">
                <Link href="/cart" className="relative">
                 
                    <ShoppingCart className="h-6 w-6" ></ShoppingCart>
                    <span id="cartQty" className="bg-orange-600 text-white w-4 h-4 absolute text-center rounded-full text-xs justify-center items-center -top-2 -right-0">
                    {totalQty?totalQty:0}
                    </span>
                  
                </Link>
              </div>
              <Menu
            className="flex sm:hidden flex-col cursor-pointer"
            onClick={handleClick("flex-row")}
          />
        
      </nav>
      <nav id="mobileNav" className="z-50 bg-white hidden justify-center items-center w-screen h-full  absolute left-0 top-0 mt-5 mr-5 ">
            
            <div className="flex-row w-full h-full  justify-center items-center text-center">
              <Link href="/" className="w-full flex justify-center items-center ">
                
                  <Image
                    width={200}
                    height={125}
                    src={urlForImage(data.logo).url()}
                    alt="Site Logo"
                  />
                
              </Link>
              <ul className="flex-row gap-y-2 justify-center items-center ">
                {data.menu.map((mItem: any, index:any) => (
                  <li key={index}>
                    <Link
                      className="text-lg" 
                      href={`/shop${mItem.menuUrl}`}
                    >
                      {mItem.item}
                    </Link>
                  </li>
                ))}
                <li key={100}>
                  <Link  href="/shop"> All Products</Link>
                </li>
              </ul>
              <div className="flex mt-5 justify-center items-center -space-x-10">
                <Input className="max-w-sm" ></Input>
                <button>
                  <Search className="" ></Search>
                </button>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-300 flex mt-5 ml-auto mr-auto justify-center items-center">
                <Link href="/cart" className="relative">
                 
                    <ShoppingCart className="h-6 w-6" ></ShoppingCart>
                    <span id="cartQty" className="bg-orange-600 text-white w-4 h-4 absolute text-center rounded-full text-xs justify-center items-center -top-2 -right-0">
                    {totalQty?totalQty:0}
                    </span>
                  
                </Link>
              </div>
            </div>
            <div className="absolute right-2 top-2">
              <X className="cursor-pointer" onClick={handleClick("hidden")} />
            </div>
          </nav>
 

    </header>
  );
}
