import React from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image";

const Hero = (HeroData:any)=>{
    const Data = HeroData;
    
    
    return(
        <section className=" flex gap-y-10 flex-col lg:flex-row  justify-center items-center ">
            {/*Left Side of the Hero*/}
            <div className="flex-1"><Badge className=" py-3 px-5 rounded-lg bg-blue-200 text-blue-500 hover:bg-blues-200 hover:text-blue-500">{Data.HeroData.homePageBannerIconMessage}</Badge>
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
      <div className="flex-1 relative justify-center items-center">
        
      {
              <Image className=" rounded-full m-0  mr-auto ml-auto" width={278} height={296} src={urlForImage(Data.HeroData.BannerImage).url()} alt="brand images"></Image>
            }
      </div>
        </section>
    )
}
export default Hero;