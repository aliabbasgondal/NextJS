import * as bcrypt from "bcrypt"
import postgres from "postgres";
import { resourceUsage } from "process";
interface RequestBody{
    name:string;
    username:string;
    password:string;
}
export async function POST(reqeust:Request) {
   const body:RequestBody = await reqeust.json();
   const conn = postgres({
    ssl: require,
  });
   const bcryptPassword=await bcrypt.hash(body.password,10);
   const querySQL = `insert into accounts(username, name,password,active)
   values('${body.username}','${body.name}','${bcryptPassword}',true) RETURNING id, name, username, password, active`;
   
   
   const results = await conn.unsafe(querySQL);
  const user: any = results[0];
   
   const {password, ...result} = user;
   return new Response(JSON.stringify(result));
}
