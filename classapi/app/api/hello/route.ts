import { NextRequest, NextResponse } from "next/server"
export async function GET(request: Request) {
  return NextResponse.json({
    From: "Zia",
    Message: "Greetings from Pakistan",
    RequestType: "GET"
  });
}

export async function POST(request: Request) {
  const req = await request.json();
  if (req.name){
    return NextResponse.json({
      To: "Zia",
      Messsage: "All well here",
      RequestType:"pOST"
    });
  }
  else{return new Response('Please include your name in t the post reqeust')}
  
}
export async function PUT(request: Request) {
  const req = await request.json();
  if (req.name){
    return NextResponse.json({
      To: "Zia",
      Messsage: "All well here",
      age: req.age,
      RequestType:"pOST"
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
      RequestType:"pOST"
    });
 // }
  //else{return new Response('Please include your name in t the post reqeust')}
  
}
