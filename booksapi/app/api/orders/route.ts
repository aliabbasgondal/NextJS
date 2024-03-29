import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";
export async function GET(request:Request) {
  const conn = postgres({
    ssl: require,
  });
  try{
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
export async function POST(request: Request) {
  const conn = postgres({
    ssl: require,
  });
  try {
  const req = await request.json();
  if(req.client_id && req.book_id){
    const now = new Date(Date.now());
const timestamp = now.toISOString().replace('T', ' ').replace('Z', '');
  const result = await conn.unsafe(`insert into orders(client_id, date_added, date_updated, is_canceled) 
  values(${req.client_id},'${timestamp}','${timestamp}',FALSE) RETURNING order_id;`);
  console.log("backend result", result);

  

  
    const submitOrders = await conn.unsafe(`insert into order_detail(book_id,	client_id,	is_removed,	order_id,	qty) 
  values(${req.book_id},${req.client_id},FALSE,${result[0].order_id},1) RETURNING order_detail_id;`);
  
  console.log("order detail", submitOrders);

   
  }
  return new NextResponse(JSON.stringify('ok'));
 
}

 catch (e) {
  console.error(e);
  return new Response(`${e}`, { status: 400 });
}
}