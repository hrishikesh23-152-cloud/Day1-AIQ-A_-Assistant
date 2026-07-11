'use client'

import {Button} from "@/components/ui/button";
import {  useRef, useState } from "react";
import {Input} from "@/components/ui/input"
import {CardHeader,Card,CardTitle, CardContent} from "@/components/ui/card"
type Answer = {
  summary: string,
  confidence: number
}

export default function Home() {
  const fromref = useRef<HTMLFormElement>(null);
  const inputref = useRef<HTMLInputElement>(null);
  const [query,setQuery] = useState<string>("");
  const [answer,setAnswer] = useState<Answer[]>([]);
  const [loading,setLoading] = useState(false)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  const Query = query;
  if(!Query || loading){
    return 
  }
  setLoading(true);
  try {
    const respond = await fetch('/api/ask',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({query:Query})
    })
    const data = await respond.json();
    if(!respond.ok){
            throw new Error(`HTPP error status code :${respond.status}`);
        }
        const {output} = data 
    
        setAnswer(prev=>[...prev,output]);
        setQuery('');
        inputref.current?.focus();
  } catch (error) {
    console.error(error)
  }
  finally{
    setLoading(false);
  }
  }
  return (
    <div className="min-h-dvh w-full  font-mono">
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 pb-20 pt-10 bg-white/70">
    <header className="mb-5">
      <h1 className="text-2xl text-gray-800 font-bold font-mono">Hello dear ask me anything..</h1>
    </header>
      <Card className=" flex-1 mb-6 ">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {
            answer.length ===0?
            (
              <p className="text-lg text-gray-400">
              Ready when you are
            </p>
            ):(
              answer.map((ans,index)=>(
                <div key={index} className="rounded-xl border-1 border-gray-400 p-4 bg-gray-100">
                  <div className="text-lg font-black">
                    {ans.summary}
                  </div>
                  <div className="text-sm text-gray-500">
                   Confidence:{ans.confidence}
                  </div>
                </div>
              ))
            )
          }
        </CardContent>
      </Card>
      <form ref={fromref} onSubmit={handleSubmit} className="fixed  inset-x-0 bottom-0 mx-auto w-full max-w-2xl px-6 py-6 mt-8 ">
        <div className="flex gap-2 z-100">
          <Input
        ref={inputref}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Type your question"
        disabled={loading}
        className="h-12 z-10"
        ></Input>
        <Button type="submit" disabled={loading} className="h-12 z-100">
          {
            loading ? "Thinking..." : "Ask"
          }
        </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
