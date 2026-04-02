import { createOpenAI } from "@ai-sdk/openai";

const nvidia = createOpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY || "",
});

export const nvidiaModel = nvidia("nvidia/llama-3.1-nemotron-ultra-253b-v1");
