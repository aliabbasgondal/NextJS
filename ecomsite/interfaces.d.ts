import { Image } from "sanity";

export interface Product{
    _id: string,
    title: string,
    detail: string[],
    price: number,
    size: size[],
    description: string,
    category: { name: string },
    subCategory: { name: string },
    image: Iimage,
    Alternative_Image: Iimage[],
    color: color[],
    sale_product: string,
    sale_price: string,
    new_product: string,
    user_id:string,
    quantity:number,

}