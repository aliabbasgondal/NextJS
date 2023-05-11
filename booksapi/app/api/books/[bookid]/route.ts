import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";
export async function POST(request: Request , { params }:{
  params: { slug: string }
}) {
  const conn = postgres({
    ssl: require,
  });

  try {
    const req = await request.json();
    
    
    const querySQL= `SELECT * FROM books` + (req.booktype &&  req.bookid ? ` WHERE booktype='${req.booktype}' and id=${req.bookid}` : '') + (req.booktype &&  !req.bookid ? ` WHERE booktype='${req.booktype}'` : '') + (! req.booktype && req.bookid ? ` WHERE id=${req.bookid}` : '')  +  (req.limit ? ` LIMIT COALESCE(${req.limit}, 0);`:'');
    
      const result = await conn.unsafe(querySQL)
   
    if (result.length === 0) {
      return new Response("No data found", { status: 404 });
    }
  
    return new NextResponse(JSON.stringify(result));
  } catch (e) {
    console.error(e);
    return new Response(`${e}`, { status: 400 });
  }
}
