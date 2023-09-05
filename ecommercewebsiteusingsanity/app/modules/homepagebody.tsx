import Image from "next/image"
import { client } from "@/app/lib/sanityClient"
import { Image as Iimage } from "sanity"
import { urlForImage } from "@/sanity/lib/image"


import Hero from "../views/Hero"
import ProductList from "../views/ProductsList"
import Promotions from "../views/promotions"
import FeatureSection from "../views/featuresection"
import NewsLetter from "../views/newsletter"
export const getHomeBodyData = async () => {
  const res = await client.fetch(
    `
        *[_type == "homePage"][0]
        {
          banner->
          {
              homePageBannerIconMessage,
              homePageBannerSubTitle,
              homePageBannerSubTitle2,
              homePageBannerButtonText[]
              ,
              "brandImages" : brandImages[]
              ,
                BannerImage
        
          },
          homePagePromotionsProducts->
          {
              SectionTitle,
              promotionalImage[]->{
                title,
                price,
                sale_Product_price,
                image,
                _id
              }
          },
          promotions->{
            title,
            promotionalBanner1,
            promotionalBanner2,
            promotionalImage[]->{
                title,
                price,
                sale_Product_price,
                image,
                _id
              }
          },
          homePagePromotionalArea ->
          {
            Title,
            PromotionalAreaLeftMessage,
            PromotionalAreaRightMessage,
            detail,
            FeatureSectionButton,
            featureImage

          },
          newsletter->{
            backdropText,
            subHdeading,
            text
          }
          
        }
        `
  );
  return res;
}

export default async function Homepagedata() {
  const data = await getHomeBodyData();

  return (
    <div>
      <Hero HeroData={data.banner}></Hero>
      <Promotions Promotions={data.promotions}></Promotions>
      <ProductList HomePageProducts={data.homePagePromotionsProducts}></ProductList>
      <FeatureSection PromotionalData={data.homePagePromotionalArea}></FeatureSection>
      <NewsLetter newsletterData={data.newsletter} ></NewsLetter>
    
      </div>
          
  )
}