import Image from "next/image"
import { client } from "@/app/lib/sanityClient"
import {Image as Iimage} from "sanity"
import { urlForImage } from "@/sanity/lib/image"
import {toHTML} from '@portabletext/to-html'
import parse from 'html-react-parser';
import Link from "next/link"
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";
export const getFooterData =async () => {
    const res = await client.fetch(
        `
        *[_type == "footer"][0]
{
  detail,
  socialMedia[] ->{name,link},
  FooterLogo,
  designedBy,
  copyRight,
  footerLinks[]->{Title},
  
}
        `
    );
    return res;
}

export default async function Footer(){
const data = await getFooterData();

const arrayItem = data.footerLinks.slice(0,3);

const arrayItems = data.footerLinks.slice(4,data.footerLinks.length);

  
    return(
        <footer className=" grid grid-cols-1 bg-white">
            <div className=" grid grid-cols-1 lg:grid-cols-4 pl-16 pr-16 pt-32 pb-32 lg:p-16">
                <div className=" w-full gap-8 flex flex-col justify-between lg:w-4/5">
                <Image width={180} height={60}
                    src={urlForImage(data.FooterLogo).url()} alt="site footer Logo"></Image>
                    <div className=" font-normal text-base leading-4 text-[#212121] text-justify ">
                    {
                 parse( toHTML(data.detail, {
                    components: {
                      /* optional object of custom components to use */
                    },
                  }))
                
               }
                    </div>
                    <div className="flex gap-4">
                        
                        {
                    data.socialMedia.map((socialMediaItem:any,index:number)=>(
                        <Link className="pl-[12px] pr-[12px] pt-[10px] pb-[10px] bg-[#f1f1f1]" href={socialMediaItem.link} key={index}>
                            {socialMediaItem.name == "Facebook"?
                             <FacebookIcon></FacebookIcon>: 
                             socialMediaItem.name =="Twitter"?
                             <TwitterIcon></TwitterIcon>:
                             <InstagramIcon></InstagramIcon>    
                        }
                           
                        </Link>
                    ))
                }
                        
                    </div>
                </div>
                <div className="lg:mt-0 mt-10">
                    <h3 className="font-bold text-lg tracking-wide text-[#666] leading-5 pb-6">
                        Company
                    </h3>
                    <ul className="w-full flex flex-col">
                    {
                        arrayItem.map((items:any)=>(
                            <li  key={items.Title} className="leading-10 w-full"><Link legacyBehavior passHref  href={items.Title} >
                                {items.Title}
                            </Link>
                            </li>
                        ))    
                    }
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg tracking-wide text-[#666] leading-5 pb-6">
                        Support
                    </h3>
                    <ul className="w-full flex flex-col">
                    {
                        arrayItem.map((items:any)=>(
                            <li key={items.Title} className="leading-10 w-full">
                            <Link legacyBehavior passHref  href={items.Title} >
                                {items.Title}
                            </Link>
                            </li>
                    
                        ))    
                    }
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg tracking-wide text-[#666] leading-5 pb-6">
                        Contact
                    </h3>
                    <ul className="w-full flex flex-col">
                    {
                        arrayItems.map((items:any)=>(
                            <li key={items.Title} className="leading-10 w-full">
                            <Link legacyBehavior passHref  href={items.Title}>
                                {items.Title}
                            </Link>
                            </li>
                        ))    
                    }
                    </ul>
                </div>
            </div>
          <div className=" grid grid-cols-1 text-center justify-center border-t-1 border-solid border-[#666]">
            <p className=" font-normal text-base leading-5 text-[#666] pt-5 pb-5">Copy Right 2023 @{data.copyRight}</p>
            <p className=" font-normal text-base leading-5 text-[#666]">{data.designedBy}</p>
          </div>
        </footer>
    )
}