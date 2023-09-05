import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { urlForImage } from "@/sanity/lib/image"
import { Image as Iimage } from "sanity"
const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key,
    {
        apiVersion : "2022-11-15",
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
  const body = await request.json();
  
  try {
    if (body.item.length > 0) {
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
                name: items.title,
                
                
              },
              unit_amount: items.price * 100,
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
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}