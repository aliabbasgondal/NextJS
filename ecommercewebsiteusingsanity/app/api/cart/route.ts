import { NextResponse, NextRequest } from "next/server";
import {db, cartTable} from "@/app/lib/drizzle"
import {v4 as uuid} from "uuid"
import {cookies} from "next/headers"
import { eq, and } from "drizzle-orm";
import { client } from "@/app/lib/sanityClient";


export const getProductData = async (productId: any) => {

    const res = await client.fetch(`
  *[_type == "product" && _id == "${productId}"][0] {
    _id,
    detail,
    price,
    "size": Size[]-> {sizes},
    description,
    title,
    "category": category-> {name},
    "subCategory": subCategory-> {name},
    image,
    Alternative_Image,
    "color": color[]-> {name},
    sale_product,
    sale_price,
    new_product
  }
  `





    );
    return res
}
export const GET =async (request:NextRequest) => {
    const userIDPassed=request.nextUrl.searchParams.get("user_id");
    
    try{
        
        
        if(userIDPassed){

            
            const res:any[] = await db.select().from(cartTable).where(eq(cartTable.user_id,userIDPassed)); 
            const cartItems = await Promise.all(res.map(async (item) => ({
               product: await getProductData(item.product_id),
               quantity:item.quantity


            })));
            const totalQuantity =  cartItems.reduce((total,item) => total + item.quantity, 0);
            const totalPrice = cartItems.reduce((total, item) => total + (item.product.sale_price != null ? item.product.sale_price : item.product.price) * item.quantity, 0);
        
            
        return  NextResponse.json({cartItems,totalQuantity,totalPrice},{status:200});
        }else{
            throw new Error("User does not exists")
        }
    } catch (error){
        console.log(error);

        return NextResponse.json({Messsage:error},{status:500})
    }
    
}

export const POST =async (request:NextRequest) => {
    const req = await request.json();
    
    const uid=uuid();
    const setCookies = cookies();
    const user_id = cookies().get("user_id");
    
    if(!user_id)
    {
        setCookies.set("user_id", uid);
    }
    

    try{
       if(req){

       const res= await db.insert(cartTable).values(
            {
                product_id: req.product_id,
                quantity: req.quantity,
                user_id: cookies().get("user_id")?.value as string,
            }
        ).returning();
        console.log(res,"result");
            
            return  NextResponse.json("Order Submitted",{status:200});
        }else{
            throw new Error("Something Went Wrong.");
            
        }
        
    } catch (error){
        console.log(error);
        return  NextResponse.json({Message:error},{status:400});

    }
    
}
export const DELETE =async (request:NextRequest) => {
    const userIDPassed=request.nextUrl.searchParams.get("user_id");
    try{
        const user_id = userIDPassed;
        const req = await request.json();
        if(!user_id && req.product_id){

            const uID=cookies().get("user_id")?.value as string;
          
            const res = await db.delete(cartTable).where(eq(cartTable.user_id,uID) && eq(cartTable.product_id,req.product_id)).returning(); 
        
        return  NextResponse.json({res});
        }
        else{
            return NextResponse.json("Your cart is empty, please add some product(s)");
        }
    
    }
    catch(error){
        return NextResponse.json("Something Went Wrong, Please try again letter")
    }
}

export const PUT =async (request:NextRequest) => {
    
    try{
        const user_id = cookies().get("user_id");
        const req = await request.json();
        if(!user_id && req.product_id){

            const uID=cookies().get("user_id")?.value as string;
          
            const res = await db.update(cartTable).set({quantity:req.quantity}).where(and(eq(cartTable.user_id,uID), eq(cartTable.product_id,req.product_id))).returning(); 
        
        return  NextResponse.json({Message:"Item Quantity Updated"},{status:200});
        }
        else{
            throw new Error("Faild to update quantity");
        }
    
    }
    catch(error){
        return NextResponse.json({Message:error},{status:500})
    }
}

export const PATCH =async (request:NextRequest) => {
    
    try{
        const user_id = cookies().get("user_id");
        const req = await request.json();
        if(!user_id && req.product_id){

            const uID=cookies().get("user_id")?.value as string;
          
            const res = await db.update(cartTable).set({quantity:req.quantity}).where(eq(cartTable.user_id,uID) && eq(cartTable.product_id,req.product_id)).returning(); 
        
        return  NextResponse.json({res});
        }
        else{
            return NextResponse.json("Your cart is empty, please add some product(s)");
        }
    
    }
    catch(error){
        return NextResponse.json("Something Went Wrong, Please try again letter")
    }
}