import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image'
const PromotionalBannerWithButton =({PromotionalBannerData}:{PromotionalBannerData:any})=>{
    
    return(
        
                <div  className="bg-[#212121] items-center  pr-8  pl-8 pt-12 pb-12 flex flex-col justify-center align-middle center tracking-wider text-white">
                  <div className="w-full flex-row">
                    <h3 className="font-bold text-3xl leading-9 w-full align-middle text-center">
                      <span className="font-extrabold text-4xl leading-10">
                        {
                          PromotionalBannerData.heading
                        }
                      </span>
                    </h3>
                    <p className=" font-normal text-sm leading-6 tracking-wide w-full align-middle text-center">

                      {
                        PromotionalBannerData.subHeading
                      }
                    </p>

                  </div>
                  {PromotionalBannerData.buttonbg &&
                    <Image className="h-52 w-64" width={260} height={200}
                      src={urlForImage(PromotionalBannerData.buttonbg).url()} alt="brand images"></Image>
                  }
                  {PromotionalBannerData.buttonLink && 
                  (<button className="font-bold  text-white  bg-[#474747] pt-[.5rem] pl-[2.5rem] pb-[.5rem] pr-[2.5rem] rounded-lg">
                  <a href={PromotionalBannerData.buttonLink}>{PromotionalBannerData.buttonText}</a></button>)
                    }
                </div>
    
                

    )
}
export default PromotionalBannerWithButton