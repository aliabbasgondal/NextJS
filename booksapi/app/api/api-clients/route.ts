import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import * as bcrypt from 'bcrypt';

import { resourceUsage } from "process";
import { signJWTAccessToken } from "@/app/lib/jwt";

interface RequestBody {
  clientName: string;
  clientEmail: string;
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
  
  
  const querySQL = `SELECT * FROM accounts WHERE name='${body.clientName}' and username='${body.clientEmail}'`;
  
  const results = await conn.unsafe(querySQL);
  const user:any = results[0];
 

  if (user) {
    
      const { password, ...userWithoutPass } = user;
      
      const accessToken = signJWTAccessToken(userWithoutPass);
      
      const result = {
        
        accessToken
      }
      return new Response(JSON.stringify(result));
   
  } else {
    return new Response(JSON.stringify(null));
  }
}
