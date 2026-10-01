import { createChatModel } from "./ic-model";
import { Result, ResultSchema } from "./schema";

export async function StructuredOutput(query: string): Promise<Result> {
  const { model } = createChatModel();

  const system = "You are an expert assistant that explains topics simply for beginners.";
  const user = `Summarize the following concept clearly:\n"${query}"`;

  // withStructuredOutput automatically enforces the schema
  const structuredModel = model.withStructuredOutput(ResultSchema);

  const structuredResult = await structuredModel.invoke([
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: user,
    },
  ]);

  return structuredResult;
}
