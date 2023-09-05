import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image'
const PromotionalBanner =({PromotionalBannerData}:{PromotionalBannerData:any})=>{
    
    return(
        
                <div  className="bg-[#d6d6d8] flex items-center justify-center h-full pl-8 pr-8 text-[#212121]">
                  <div className=" tracking-wide pr-5 pl-5 pt-2">
                    <h3 className="font-bold text-3xl leading-9">
                      <span className="font-extrabold text-3xl leading-4">
                        {
                          PromotionalBannerData.heading
                        }
                      </span>
                    </h3>
                    <p className=" font-normal text-lg leading-5 tracking-wide">

                      {
                        PromotionalBannerData.subHeading
                      }
                    </p>

                  </div>
                  {PromotionalBannerData.buttonbg &&
                    <Image className="" width={260} height={200}
                      src={urlForImage(PromotionalBannerData.buttonbg).url()} alt="brand images"></Image>
                  }
                  {PromotionalBannerData.buttonLink && 
                  (<button className="font-bold text-base leading-7 tracking-wide text-white border-0 bg-[#474747] p-[.5rem 2.5rem] mt-1 border-r-8">
                  <a href={PromotionalBannerData.buttonLink}>{PromotionalBannerData.buttonText}</a></button>)
                    }
                </div>
    
                

    )
}
export default PromotionalBanner