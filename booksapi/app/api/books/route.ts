import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";

export async function POST(request: Request) {
  const conn = postgres({
    ssl: require,
  });

  try {
    const req = await request.json();
    
    
    const querySQL= `SELECT * FROM books` + (req.booktype? ` WHERE booktype='${req.booktype}'` : '') +  (req.limit ? ` LIMIT COALESCE(${req.limit}, 0);`:'');
    
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


export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });

  try {
    
    
    
    const querySQL= `SELECT * FROM books` + (request.nextUrl.searchParams.get('type') ? ` WHERE booktype='${request.nextUrl.searchParams.get('type')}'` : '') + (request.nextUrl.searchParams.get('limit') ? ` LIMIT COALESCE(${request.nextUrl.searchParams.get('limit')}, 0);`:'');
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
export async function PUT(request: Request) {
  const req = await request.json();
  if (req.name){
    return NextResponse.json({
      To: req.name,
      Messsage: "All well here",
      age: req.age,
      RequestType:"Put"
    });
  }
  else{return new Response('Please include your name in t the post reqeust')}
  
}
export async function DELETE() {
  //const req = await request.json();
 // if (req.name){
    return NextResponse.json({
      To: "Zia",
      Messsage: "All well here",
     // age: req.age,
      RequestType:"Delte"
    });
 // }
  //else{return new Response('Please include your name in t the post reqeust')}
  
}
