import Link from "next/link"
import Header from "../modules/header"
import Footer from "../modules/footer"
export default function Home(){
  
return(<>
<Header></Header>
    <div>
      <h1>Product Selection</h1>
      <Link href={"/shop"}>Please select a product first</Link>
    </div>
    <Footer></Footer></>
)
}