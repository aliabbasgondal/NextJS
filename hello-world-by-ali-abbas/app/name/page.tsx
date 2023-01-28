'use client';

import { useRouter } from "next/navigation"
export default function GiveName(){
    const router = useRouter();
    return(
        <div>Nested folder
        <br />
        <button type="button" onClick={() => router.push('/name/city')}>
            Get City
        </button>
        </div>
        )
}