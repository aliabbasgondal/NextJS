import { verifyJwt } from "@/app/lib/jwt";

export async function GET(request:Request, {params}:{params:{id:number}}) {
    const accessToken = request.headers.get("authorization")
        
    if(!accessToken || !verifyJwt(accessToken)){
        return new Response(
            JSON.stringify({
                error:"unauthorized",
            }),
            {
                status:401,
            }
        )
    }
   
        return new Response(JSON.stringify({
            response:"Ok",
        }),
        {
            status:200,
        }
        )
    
}
