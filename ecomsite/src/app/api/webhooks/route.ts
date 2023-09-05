import { cartTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

const endpointSecret= process.env.NEXT_PUBLIC_STRIPE_WEBHOOKS as string;
export const POST = async(req:any, res:any)=>{
    
const headerList = headers();

try{
    const rawBody = await req.text();
    
    const sig = headerList.get("stripe-signature");
    
   
    const stripe = new Stripe(
        process.env.STRIPE_SECRET_KEY as string,
        {
          apiVersion: '2023-08-16',
        }
      )
   
    let event;
    
    try{
        console.log(!sig || !endpointSecret,'event');
    if(!sig || !endpointSecret)
    {
        return new Response("Webhook signature or endpoint is missing"),{status:400};
    }
    
    event = stripe.webhooks.constructEvent(
        rawBody.toString(), // Stringify the request for the Stripe library
      sig,
      endpointSecret
    )
    console.log('i am here');
} catch (err: any) {
    console.log(`⚠️  Webhook sig`);
    return new Response("webhooks signature / endpoint secret missing" , {
        status: 400
    })
  } 
    console.log(event.type,'session');
    if('checkout.session.completed' === event.type)
    {
        const session = event.data.object;
        //@ts-ignore
        const customerData= await stripe.customers.retrieve(session.customer);
        //@ts-ignore
        const userId=customerData.metadata.userId;
        await db.delete(cartTable).where(eq(cartTable.user_id,userId));
        console.log("Payment success--", session);
        //@ts-ignore
        const line_items= await stripe.checkout.sessions.listLineItems(event.data.object!.id)
        return new Response("Payment confirmation Router Recipt")
    }
    else{
        res.setHeader("Allow","POST")
    }
}
catch(error){
    console.log("Error in webhook -------", error);
    return;
}
}