import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req, res) {
  try {
    const genAi = new GoogleGenerativeAI(GEMINI_API_KEY);

    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data = await req.json();

    const prompt  = data.body

    const result = await model.generateContent(prompt);

    const response = result.response;

    const output = await response.text()

    return NextResponse.json({ output: output });
  } catch (error) {
    console.error('Error in Gemini request:', error);
    return NextResponse.error({ error: 'Failed to process request' });
  }
}