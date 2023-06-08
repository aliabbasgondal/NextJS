import { verifyJwt } from "@/app/lib/jwt";
import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";
export async function GET(request:Request , { params }:{ params: { orderId: number }
}) {
    const accessToken = request.headers.get("authorization")
        
    if(!accessToken || !verifyJwt(accessToken)){
        return new Response("Not authorized", { status: 404 });
    }
   
  const conn = postgres({
    ssl: require,
  });
  try{
    const querySQL = `SELECT c.bookname, c.author, c.isbn, b.qty, c.price, a.date_added, a.client_id
    FROM orders a join order_detail b on a.order_id = b.order_id join books c on c.id=b.book_id where a.order_id=${params.orderId}`;
    const result = await conn.unsafe(querySQL);
   console.log(querySQL);
      if (result.length === 0) {
        return new Response("No data found", { status: 404 });
      }
    
          
    else{
      return new NextResponse(JSON.stringify(result));

    }
  }
  catch(e){
    console.error(e);
  return new Response(`${e}`, { status: 400 });
  }
  
}

export async function PATCH(request:Request , { params }:{ params: { orderId: number }
}) {
    const accessToken = request.headers.get("authorization")
        
    if(!accessToken || !verifyJwt(accessToken)){
        return new Response("Not authorized", { status: 404 });
    }
   
  const conn = postgres({
    ssl: require,
  });
  try{
    const req = await request.json();
    const querySQL = `SELECT client_id from orders where order_id=${params.orderId}`;
    const selestqry = await conn.unsafe(querySQL);
    const updateQry = `update accounts set name='${req.clientName}' where id=${selestqry[0].client_id} RETURNING name;`;
    const result = await conn.unsafe(updateQry);
   console.log(updateQry);
      if (result.length === 0) {
        return new Response("No data found", { status: 404 });
      }
    
          
    else{
      return new NextResponse(JSON.stringify(result));

    }
  }
  catch(e){
    console.error(e);
  return new Response(`${e}`, { status: 400 });
  }
  
}


export async function DELETE(request:Request , { params }:{ params: { orderId: number }
}) {
    const accessToken = request.headers.get("authorization")
        
    if(!accessToken || !verifyJwt(accessToken)){
        return new Response("Not authorized", { status: 404 });
    }
   
  const conn = postgres({
    ssl: require,
  });
  try{
    
    const deltequery = `Delete from order_detail where order_id=${params.orderId}`;
    const delqueryResult = await conn.unsafe(deltequery);
    const deltequeryOrders = `Delete from orders where order_id=${params.orderId}`;
    const delqueryResults = await conn.unsafe(deltequeryOrders);
    

    const querySQL = `SELECT c.bookname, c.author, c.isbn, b.qty, c.price, a.date_added, a.client_id
    FROM orders a join order_detail b on a.order_id = b.order_id join books c on c.id=b.book_id`;
    const result = await conn.unsafe(querySQL);
   
      if (result.length === 0) {
        return new Response("No data found", { status: 404 });
      }
    
          
    else{
      return new NextResponse(JSON.stringify(result));

    }
  }
  catch(e){
    console.error(e);
  return new Response(`${e}`, { status: 400 });
  }
  
}
