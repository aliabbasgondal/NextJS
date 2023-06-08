"use client";
import React from "react";
import {useSession, signOut, signIn} from "next-auth/react"
const SigninButton = () =>{
    const{data: session} = useSession();
    console.log(session, "user session");
    console.log(session?.user);
    if(session && session.user)
    {
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-000">
                {
                    session.user.name
                }
                </p>
                <button onClick={()=>signOut()} className="text-red-000">
                    sign out
                </button>
            </div>
        )
    }
    return(
      <button onClick={()=>signIn()} className="text-green-000 ml-auto">
      Sign In
      </button>
    )
}
export default SigninButton;