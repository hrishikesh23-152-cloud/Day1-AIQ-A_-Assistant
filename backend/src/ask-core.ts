import { createChatModel } from "./ic-model";
import {Result, ResultSchema} from "./schema";

export async function StructuredOutput(query:string):Promise<Result>{
    const {model} = createChatModel();

    const system = "you are a cool assistant. Return only the requested JSON."
    const user = "Summarize for a beginner:\n" +
    `"${query}"\n`+
    `return fields:Summary:(short paragraph),confidence:(0 to 1)`;

    const result = model.withStructuredOutput(ResultSchema)
    const structuredResult = await result.invoke([
        {
            role:'system',
            content:system
        },
        {
            role:'user',
            content:user
        }
    ])
    return structuredResult;
}