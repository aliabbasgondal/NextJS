import { Image } from "sanity";

export interface Product{
    _id:string;
    name:string;
    price:number;
    totalPrice:number;
    totalQuantity:number;
    subCatgory:string;
    image:Array<Image>;
    userID:string;
    quantity:number;

}