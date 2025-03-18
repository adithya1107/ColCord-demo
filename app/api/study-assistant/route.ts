import OpenAI from "openai"
import { StreamingTextResponse } from "ai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set")
    return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 })
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are an AI study assistant. Your job is to help students understand concepts, provide study tips, and answer questions related to their coursework.",
        },
        ...messages,
      ],
    })

    return new StreamingTextResponse(response)
  } catch (error) {
    console.error("Error in study assistant:", error)
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}