
import Productdetail from "../../modules/productDetail";


export default async function Home({ params }: { params: { products: string } }) {
  


    return (
     
      
      <Productdetail id={params.products}></Productdetail>
      
    )
  }
  