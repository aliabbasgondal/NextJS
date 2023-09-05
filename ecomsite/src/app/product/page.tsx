

import Category from "@/components/sections/Category";



type Props = {
    params: {
      slug: string;
    };
  };
  


export default function Page({ params }: Props) {


  
 

    return (
     
      <>
      <Category type={params.slug}></Category>
      </>
    )
  }
  