import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    })

    return NextResponse.json({
      data: completion.choices[0].message?.content,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}

