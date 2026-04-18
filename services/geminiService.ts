import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Question, QuestionType, AnalysisResult, Answer } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAssessment = async (profile: UserProfile): Promise<Question[]> => {
  const modelName = 'gemini-2.5-flash';

  const prompt = `
    Generate a skill assessment for a user with the following profile:
    - Persona: ${profile.persona}
    - Current Role: ${profile.currentRole}
    - Goal: ${profile.goal}
    
    Create 5 questions. Mix technical/hard skills and soft skills relevant to their goal.
    For 'multiple_choice', provide 4 distinct options.
    For 'rating', the user will rate from 1-5 (do not provide options).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              text: { type: Type.STRING },
              type: { type: Type.STRING, enum: [QuestionType.MULTIPLE_CHOICE, QuestionType.RATING] },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                nullable: true 
              }
            },
            required: ["id", "text", "type"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Question[];
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Error generating assessment:", error);
    // Fallback questions if API fails
    return [
      { id: 1, text: "Rate your proficiency in project management.", type: QuestionType.RATING },
      { id: 2, text: "Which best describes your communication style?", type: QuestionType.MULTIPLE_CHOICE, options: ["Direct", "Collaborative", "Passive", "Analytical"] },
      { id: 3, text: "How comfortable are you with data analysis?", type: QuestionType.RATING },
    ];
  }
};

export const analyzeResults = async (profile: UserProfile, answers: Answer[]): Promise<AnalysisResult> => {
  const modelName = 'gemini-2.5-flash';

  const prompt = `
    Analyze the following assessment results for a ${profile.persona} aiming to be ${profile.goal}.
    
    User Profile: ${JSON.stringify(profile)}
    Answers: ${JSON.stringify(answers)}
    
    Provide a detailed analysis including:
    1. Overall score (0-100).
    2. Professional Level (Beginner, Intermediate, Advanced, Expert).
    3. 4-6 Key Skill Gaps with current vs target scores.
    4. 3-4 Specific learning recommendations (Courses, Projects, etc.).
    5. A short encouraging summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            level: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced", "Expert"] },
            summary: { type: Type.STRING },
            skillGaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  currentScore: { type: Type.INTEGER },
                  targetScore: { type: Type.INTEGER },
                  gapLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
                }
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["Course", "Project", "Mentor", "Article"] },
                  provider: { type: Type.STRING },
                  duration: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("Empty analysis response");
  } catch (error) {
    console.error("Error analyzing results:", error);
    return {
      overallScore: 75,
      level: "Intermediate",
      summary: "We couldn't generate a live analysis. Here is a placeholder report.",
      skillGaps: [],
      recommendations: []
    };
  }
};
