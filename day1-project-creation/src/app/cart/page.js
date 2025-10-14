'use client'

import { useParams, usePathname, useSearchParams } from "next/navigation"

export default function Cart(){
    const pathName = usePathname();
    console.log(pathName);
    const searchParams = useSearchParams();
    console.log(searchParams.get('search'),searchParams.get('randomvalue'));
    return(
        <div>
            <h1>This cart is cart component</h1>
        </div>
    )
}