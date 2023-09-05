import SiteCarousel from "./carousal";


const ProductList = ({ HomePageProducts }: { HomePageProducts: any }) => {
  return (
    <div>
        <div className="text-center flex flex-col gap-4 mb-8">
            <span className="font-bold text-center text-xs tracking-wide leading-4 text-[#0062f5]">PRODUCTS</span>
            <h2 className="font-bold text-center text-3xl">{HomePageProducts.SectionTitle}</h2>
          </div>
      <SiteCarousel ProductsList={HomePageProducts.promotionalImage} />
    </div>
  );
};

export default ProductList;
