import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { studentPerformance, interests, careerGoals } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an AI course recommendation system. Based on the student's performance, interests, and career goals, suggest suitable courses.",
        },
        {
          role: "user",
          content: `Student performance: ${studentPerformance}
Interests: ${interests}
Career goals: ${careerGoals}

Please recommend 5 courses with brief explanations.`,
        },
      ],
    })

    const recommendations = completion.choices[0].message.content

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error in course recommendations:", error)
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), { status: 500 })
  }
}

