import { NextResponse } from "next/server"

const backend = "https://day1-aiq-a-assistant-o746.onrender.com"

export async function POST(req:Request){
    try {
        const body = await req.json();
        const apiResponse = await fetch(`${backend}/ask`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        if(!apiResponse.ok){
            throw new Error(`HTPP error status code :${apiResponse.status}`);
        }
        const data = await apiResponse.json();
        return NextResponse.json(data,{status:apiResponse.status})
    } catch (error:any) {
        return NextResponse.json({
            error:"Error occured "
        })
    }
}
