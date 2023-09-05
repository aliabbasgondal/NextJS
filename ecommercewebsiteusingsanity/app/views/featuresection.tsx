import Link from "next/link";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image";
import {toHTML} from '@portabletext/to-html'
import parse from 'html-react-parser';
const FeatureSection=(props:{PromotionalData:any})=>{
    return(
        <section>
            <div className="flex md:justify-end lg:pl-16 lg:pr-16 lg:pb-8 justify-center pl-16 pr-16 pt-8 pb-16 leading-[55px] font-bold tracking-wide">
            <h1 className=" text-4xl w-full md:w-3/4  text-[#212121] lg:w-2/4">{props.PromotionalData.PromotionalAreaRightMessage}</h1>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 xl:pr-16 xl:pl-16 xl:pb-8 bg-[#fbfcff] lg:pl-32 lg:pr-32">
                <div className=" relative grid grid-cols-1 md:grid-cols-2  gap-8 lg:gap-0 ">
                <div className="font-extrabold left-0 top-0 text-7xl lg:text-8xl text-[#212121] opacity-5 justify-start z-0 absolute">{props.PromotionalData.Title}</div>
                {
                props.PromotionalData.PromotionalAreaLeftMessage.map((message:any, index:any)=>(
                <div  key={index} className="w-full xl:w-[70%] z-10">
                    <h3 className="text-lg font-semibold tracking-wide text-[#212121] mb-4">{message.Title}</h3>
                    <p className=" font-light text-base text-[#212121] tracking-wider">{message.Message}</p>

                </div>
                ))  
}
                </div>
                <div className="flex justify-center items-center gap-10">
                <Image className="min-w-[280px] min-h-[350px]"  width={300} height={350}
                    src={urlForImage(props.PromotionalData.featureImage).url()} alt="brand images"></Image>
                <div className="flex flex-col gap-8">
                
                    <p className="font-light text-base text-justifytext-[#212121]">
                    {
            parse( toHTML(props.PromotionalData.detail, {
                    components: {
                      
                    },
                  }).replace(/(<([^>]+)>)/ig, ''))
                }
                    </p>
                    <Link href={props.PromotionalData.FeatureSectionButton[0]}><Button className="bg-[#212121] w-[70%] text-sm font-semibold leading-5 pl-3 pr-3 flex items-center justify-center gap-2 text-white  "> {props.PromotionalData.FeatureSectionButton[1]}</Button></Link>
                </div>
                </div>
            </div>
        </section>
    );
}

export default FeatureSection;