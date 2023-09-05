import Product from "@/app/modules/category";





export default function Page({ params }: { params: { category: string } }) {


  
  
 

    return (
     
      <>
      <Product type={params.category}></Product>
      </>
    )
  }
  