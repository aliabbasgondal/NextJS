import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image'
const PromotionalProducts = ({PromotionalProductrData}:{PromotionalProductrData:any})=>{
    return(
        
                  <a href={`/product/${PromotionalProductrData._id}`}>
                  <div className=" pl-10">
                    <p className="font-normal text-lg -tracking-tight leading-4">
                      {PromotionalProductrData.title}
                    </p>
                    <div className="">
                        {PromotionalProductrData.sale_Product_price ?
                      <div><span className="relative after:content-none after:w-[100%] after:h-1 after:bg-[#212121] after:absolute after:bottom-3 after:left-0 line-through ">${PromotionalProductrData.price}</span>
                      <span className="font-semibold text-lg leading-6 ml-[10px]">${PromotionalProductrData.sale_Product_price}</span>
                      </div>
                      :
                      <span className="relative after:content-none after:w-[100%] after:h-1 after:bg-[#212121] after:absolute after:bottom-3 after:left-0">${PromotionalProductrData.price}</span>
                        }
                      
                    </div>
                  </div>
                  {
                    <Image width={280} height={340}
                      src={urlForImage(PromotionalProductrData.image).url()} alt="product images"></Image>
                  }
                  </a>
                
    );
}
export default PromotionalProducts