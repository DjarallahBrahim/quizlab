import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true, // Enable browser usage
  defaultHeaders: {
    "HTTP-Referer": window.location.href,
    "X-Title": "Quiz Lab"
  }
});

export interface GeneratedQuestion {
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  correctAnswers: number[];
}

export async function generateQuestions(topic: string): Promise<GeneratedQuestion[]> {
  try {
    const prompt = `Generate a quiz about "${topic}". Return ONLY a valid JSON array of questions with no additional text. Each question must have:
    - text: the question text
    - type: either "single" or "multiple"
    - options: array of possible answers (3-4 options)
    - correctAnswers: array of indices (0-based) of correct answers

    Rules:
    - For single type, only one correctAnswer
    - For multiple type, 2-3 correctAnswers
    - Make questions challenging but clear
    - Include a mix of single and multiple choice questions
    - Each question should have 3-4 plausible options

    Example format:
    [
      {
        "text": "What is JavaScript?",
        "type": "single",
        "options": ["A programming language", "A markup language", "A database"],
        "correctAnswers": [0]
      }
    ]`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response received from AI');
    }

    // Clean the response - remove any markdown code blocks if present
    const cleanResponse = response.replace(/```json\n?|\n?```/g, '').trim();

    try {
      const questions = JSON.parse(cleanResponse);

      // Validate the response format
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }

      // Validate each question
      questions.forEach((question, index) => {
        if (!question.text || !question.type || !question.options || !question.correctAnswers) {
          throw new Error(`Question ${index + 1} is missing required fields`);
        }
        if (!['single', 'multiple'].includes(question.type)) {
          throw new Error(`Question ${index + 1} has invalid type`);
        }
        if (!Array.isArray(question.options) || question.options.length < 2) {
          throw new Error(`Question ${index + 1} has invalid options`);
        }
        if (!Array.isArray(question.correctAnswers) || question.correctAnswers.length < 1) {
          throw new Error(`Question ${index + 1} has invalid correctAnswers`);
        }
      });
      return questions;
    } catch (error) {
      console.error('Failed to parse AI response:', error, '\nResponse:', cleanResponse);
      throw new Error(
        error instanceof Error 
          ? `Invalid AI response: ${error.message}`
          : 'Failed to parse AI response'
      );
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error(
      error instanceof Error 
        ? error.message
        : 'An unexpected error occurred while generating questions'
    );
  }
}