"use client"
import Link from "next/link";
import Image from "next/image";


function ProductCard (props:{title:string, price:string,ind:string, link:string, imag:string}){

    return(

        <div className="pl-3 hover:scale-125 pr-3 " key={props.ind}>
                        <Link  href={`${props.link}`}>
                            <Image
                                width={380}
                                height={400}
                                src={props.imag}
                                alt="product images"
                            />
                            <h3 className="text-lg font-bold mt-3 text-center">{props.title}</h3>
                            <p className="text-center">${props.price}</p>
                        </Link>
                    </div>
    );
}

export default ProductCard;