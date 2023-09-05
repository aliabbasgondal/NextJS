import React from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { urlForImage } from '../../../sanity/lib/image'
import Image from "next/image";
import Wrapper from "./Wrapper";

const Hero = (HeroData:any)=>{
    const Data = HeroData;
    
    
    return(
      <Wrapper>
        <div className=" flex justify-between items-center w-full gap-y-10 gap-x-20">
            {/*Left Side of the Hero*/}
            <div className="space-y-10 lg:w-[50%] w-full"><Badge className=" py-3 px-5 rounded-lg bg-blue-200 text-blue-500 hover:bg-blues-200 hover:text-blue-500">{Data.HeroData.homePageBannerIconMessage}</Badge>
            <h1 className="mt-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {Data.HeroData.homePageBannerSubTitle}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
      {Data.HeroData.homePageBannerSubTitle2}
      </p>
      <Button className="bg-black h-12  px-8 mt-3 "><Link className="justify-center flex content-center space-x-2" key={1} href={Data.HeroData.homePageBannerButtonText[1]}><ShoppingCart></ShoppingCart><span>{Data.HeroData.homePageBannerButtonText[0]}</span></Link></Button>
      <div className="flex justify-start items-start gap-8 sm:gap-16 mt-10">
              {
                Data.HeroData.brandImages.map((brand: any, index:any) => (
                  <Image key={index} width={70} height={25}
                    src={urlForImage(brand).url()} alt="brand images"></Image>
                ))
              }
            </div>
      </div>
      {/*Right Side of the Hero */}
      <div className="lg:block hidden w-[50%]">
      <div className="relative">
            <div className=" absolute w-[500px] h-[500px] bg-[#ffece3] -z-[10] rounded-full left-5 top-10"></div>
        
      {
              <Image className=" rounded-full m-0  mr-auto ml-auto" width={600} height={600} src={urlForImage(Data.HeroData.BannerImage).url()} alt="brand images"></Image>
            }
      </div>
      </div>
      
        </div>
        </Wrapper>
    )
}
export default Hero;