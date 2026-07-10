import {loadenv} from "./env"
import { ChatGroq } from "@langchain/groq"


export type Provider = 'openai' | 'groq' | 'gemini' ;

export function createChatModel(): {provider:Provider,model:any}{
    loadenv();
    const forced = (process.env.PROVIDER || "").toLowerCase() as Provider;
    const hasgroqAPI = !!process.env.GROQ_API_KEY;
    const base = {temperature:0.3 as const}
    if(forced === 'groq' || (!forced && hasgroqAPI)){
        return {
            provider : 'groq',
            model : new ChatGroq({
                ...base,
                model: "llama-3.1-8b-instant"
            })
        };
}
return {
    provider : 'groq',
    model : new ChatGroq({
        ...base,
        model: "llama-3.1-8b-instant"
    })
}
    
}