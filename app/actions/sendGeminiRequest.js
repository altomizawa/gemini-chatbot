import { NextResponse } from 'next/server';

export async function sendGeminiRequest({message}) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: message }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Gemini response:', data);
      return data.output;
    } else {
      throw new Error('Failed to send Gemini request');
    }
  } catch (error) {
    console.error('Error in Gemini request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
