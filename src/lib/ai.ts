import { createOpenAI } from "@ai-sdk/openai";

const nvidia = createOpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY || "",
});

// NVIDIA's API only serves /v1/chat/completions (not the newer /v1/responses
// endpoint that ai-sdk v6 defaults to). Use .chat() to force the right route.

// Streaming model — Nemotron is a reasoning model, so callers must prepend
// "detailed thinking off" to the system prompt or output lands in
// reasoning_content instead of content.
export const nvidiaModel = nvidia.chat("nvidia/llama-3.1-nemotron-ultra-253b-v1");

// Structured-output model — Meta Llama 3.3 70B is reliable in JSON mode
// and keeps content in `content` (no reasoning channel).
export const structuredModel = nvidia.chat("meta/llama-3.3-70b-instruct");

// Prefix to disable Nemotron's chain-of-thought so streamed text appears in
// the normal `content` field. Always lead system prompts with this.
export const NO_THINK = "detailed thinking off\n\n";
