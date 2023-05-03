import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";
export async function GET(request: Request) {
  const conn = postgres({
    ssl: require,
  });
  const req = await request.json();
  const result = await conn.unsafe(`SELECT * FROM books if(${req.booktype} , where if(${req.booktype})) if(${req.limit}, limit ${req.limit})`);
  console.log("backend result", result);
  return new NextResponse(JSON.stringify(result));
}