import { loadenv } from "./env";
import { ChatGroq } from "@langchain/groq";

export type Provider = "openai" | "groq" | "gemini";

export function createChatModel(): { provider: Provider; model: any } {
  loadenv();

  const forced = (process.env.PROVIDER || "").toLowerCase() as Provider;
  const hasGroqAPI = Boolean(process.env.GROQ_API_KEY);
  const base = { temperature: 0.3 };

  // Use llama-3.3-70b-versatile or llama-3.1-8b-instant
  const chosenModel = "openai/gpt-oss-20b";

  if (forced === "groq" || (!forced && hasGroqAPI)) {
    return {
      provider: "groq",
      model: new ChatGroq({
        ...base,
        apiKey: process.env.GROQ_API_KEY,
        model: chosenModel,
      }),
    };
  }

  return {
    provider: "groq",
    model: new ChatGroq({
      ...base,
      apiKey: process.env.GROQ_API_KEY,
      model: chosenModel,
    }),
  };
}
