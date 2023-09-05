import Image from 'next/image'
import { client } from '../../sanity/lib/client';
import Hero from '@/components/shared/Hero';
import Promotions from '@/components/shared/promotions';
import ProductList from '@/components/shared/ProductsList';
import FeatureSection from '@/components/shared/featuresection';
import NewsLetter from '@/components/shared/newsletter';

const getHomeBodyData = async () => {
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
export default async function Home() {
  const data = await getHomeBodyData();
  return (
    <main>
       <div>
      <Hero HeroData={data.banner}></Hero>
      <Promotions Promotions={data.promotions}></Promotions>
      <ProductList HomePageProducts={data.homePagePromotionsProducts}></ProductList>
      <FeatureSection PromotionalData={data.homePagePromotionalArea}></FeatureSection>
      <NewsLetter newsletterData={data.newsletter} ></NewsLetter>
    
      </div>
          
    </main>
  )
}
