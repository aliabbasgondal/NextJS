import { verifyJwt } from "@/app/lib/jwt"

export async function GET(request:Request) {
    
   
        return new Response(JSON.stringify({
            response:"Ok",
        })
        )
}