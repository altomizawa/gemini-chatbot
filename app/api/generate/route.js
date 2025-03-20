import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req, res) {
  try {
    const genAi = new GoogleGenerativeAI(GEMINI_API_KEY);

    const model = genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstructions: "You are an expert on Flexible Dieting. You are a helpful assistant.",
    });

    const data = await req.json();

    const prompt  = data.body

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.2,
      }
    });

    const result = await chat.sendMessage(`reply to this: ${prompt}` );

    const response = result.response;

    const output = await response.text()

    return NextResponse.json({ output: output });
  } catch (error) {
    console.error('Error in Gemini request:', error);
    return NextResponse.error({ error: 'Failed to process request' });
  }
}