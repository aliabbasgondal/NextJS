import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";

export async function GET(request: Request , { params }:{ params: { bookId: number }
}) {
  const conn = postgres({
    ssl: require,
  });
  
  try {
    
    
    

    const querySQL= 'SELECT * FROM books' + (params.bookId ? ` WHERE id=${params.bookId}` : '');
    console.log(querySQL);
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
