import Wrapper from "./Wrapper";
import PromotionalBanner from "./promotionalbanner";
import PromotionalBannerWithButton from "./promotionalbannerwithbutton";
import PromotionalProducts from "./promotionalproduct";

const Promotions =({ Promotions }: { Promotions: any })=>{

    return(
      <Wrapper>
        <div className=" pt-4 pb-4 ">
            <div className="items-center flex flex-col gap-4 mb-8">
            <span className="font-bold text-center text-xs tracking-wide leading-4 text-[#0062f5]">PROMOTIONS</span>
            <h2 className="font-bold text-center text-3xl">{Promotions.title}</h2>
            </div>
            <div className="lg:flex lg:flex-row flex-col  justify-between gap-8 ">
          <div className="flex flex-col gap-4">
            <PromotionalBanner PromotionalBannerData={Promotions.promotionalBanner1}></PromotionalBanner>
            <PromotionalBannerWithButton PromotionalBannerData={Promotions.promotionalBanner2}></PromotionalBannerWithButton>
          </div>
          <div className="flex-col sm:flex-row flex sm:flex-1 justify-between mt-10 lg:mt-0 align-middle items-center gap-4 ">
            
            {
                  Promotions.promotionalImage.map((pimage:any, index:number)=>(
                    <div key={index} className={`${index === 1 ? 'bg-[#d7d7d9]' : 'bg-[#efe1c7]'} pt-6 justify-center content-between w-full px-0 lg:px-5 md:w-1/2`}>
                        <PromotionalProducts PromotionalProductrData={pimage}></PromotionalProducts>
                        </div>
                ))
                }
          </div>
          </div>
          </div>
        
          </Wrapper>
    );
}

export default Promotions