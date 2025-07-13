import type { NextApiRequest, NextApiResponse } from 'next';

const promptStyles: Record<string, string> = {
  bullet: 'Summarize the following text into concise bullet points with key insights.',
  paragraph: 'Summarize the following notes into a short, clear paragraph.',
  action: 'Extract actionable insights and recommendations from the notes.',
  detailed: 'Provide a detailed and comprehensive summary of the following text.',
};

// Function to remove **bold** markdown from text
function removeBoldMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, style } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({ error: 'Input is required' });
  }

  // Pick system prompt based on style or default to 'bullet'
  const systemPrompt = promptStyles[style] || promptStyles['bullet'];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528', // use your working model ID
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: removeBoldMarkdown(input) },
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      return res.status(200).json({ summary: data.choices[0].message.content });
    }

    
    return res.status(500).json({ error: 'AI did not return a summary.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }

}
