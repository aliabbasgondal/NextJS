import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import * as bcrypt from 'bcrypt';

import { resourceUsage } from "process";

interface RequestBody {
  username: string;
  password: string;
}

interface User {
  id:number;
  name: string;
  username: string;
  password: string;
  active: boolean;
  // Add other properties of the user object here
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const conn = postgres({
    ssl: require,
  });
  
  
  const querySQL = `SELECT * FROM accounts WHERE username='${body.username}'`;
  
  const results = await conn.unsafe(querySQL);
  const user:any = results[0];
 

  if (user && (await bcrypt.compare(body.password,user.password))) {
    
      const { password, ...userWithoutPass } = user;
      
      return new Response(JSON.stringify(userWithoutPass));
   
  } else {
    return new Response(JSON.stringify(null));
  }
}
