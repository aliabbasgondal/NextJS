import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { urlForImage } from "../../../../sanity/lib/image"
import { Image as Iimage } from "sanity"
import { auth } from "@clerk/nextjs";
const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key,
    {
        apiVersion : "2023-08-16",
    });
    interface IProduct {
  
      _id: string,
      title: string,
      detail: string[],
      price: number,
      pSize: string[],
      description: string,
      category: {name:string},
      subCategory: {name:string},
      image: Iimage,
      color: string[],
      sale_product: string,
      sale_price: number,
      new_product: string,
      user_id:string,
      quantity:number,
      sub_total:number,
        
    };
export async function POST(request: NextRequest) {
  const data = await request.json();
  const body = data.product?data.product:data;

console.log(body);
  const {userId} = auth();
  const customer= await stripe.customers.create({
    metadata:{
      userId:userId,
    }
  });
  
  try {
    if (body.item.length > 0 && userId) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NMoI7AL9vHlmm5LpPWgJlcf" },
          { shipping_rate: "shr_1NMoGZAL9vHlmm5LX7sUjUFf" },
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.item.map((items: any) => {
          
          return {
            price_data: {
              currency: "pkr",
              product_data: {
                name: items.product?items.product.title:items.title,
                images:[items.product?urlForImage(items.product.image).toString():urlForImage(items.image).toString()],

                
                
              },
              unit_amount: items.product?items.product.sale_price>0? items.product.sale_price*100:items.product.price*100:items.sale_price>0? items.sale_price*100:items.price*100,
            },
            quantity: items.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        customer:customer.id,
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/cart`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found or no user login" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}