import { PredictionRequest, AIPrediction } from '../types';
import { calculatePrediction } from '../utils';

const GROK_API_ENDPOINT = import.meta.env.VITE_GROK_API_ENDPOINT;
const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;

export async function getAIPrediction(data: PredictionRequest): Promise<AIPrediction> {
  try {
    if (!GROK_API_ENDPOINT || !GROK_API_KEY) {
      // Fallback to local prediction if API credentials are not available
      return getFallbackPrediction(data);
    }

    const response = await fetch(GROK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`,
        'X-API-Version': '1.0'
      },
      body: JSON.stringify({
        model: 'grok-1',
        messages: [{
          role: 'system',
          content: 'You are an expert in digital advertising performance prediction.'
        }, {
          role: 'user',
          content: `Predict advertising performance for:
            Platform: ${data.platform}
            Ad Type: ${data.adType}
            Duration: ${data.days} days
            Daily Budget: $${data.dailyBudget}
            Country: ${data.country}
            Objective: ${data.objective}`
        }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return parseGrokResponse(result, data);
  } catch (error) {
    console.error('Prediction service error:', error);
    return getFallbackPrediction(data);
  }
}

function parseGrokResponse(grokResponse: any, data: PredictionRequest): AIPrediction {
  try {
    const analysis = JSON.parse(grokResponse.choices[0].message.content);
    
    return {
      reach: analysis.reach || 0,
      engagement: analysis.engagement || 0,
      confidence: analysis.confidence || 85,
      trends: {
        growth: analysis.marketGrowth || 0.12,
        saturation: analysis.marketSaturation || 0.65,
        competition: analysis.competitionLevel || 0.75,
        recommendation: analysis.recommendation || getDefaultRecommendation(data)
      }
    };
  } catch (error) {
    console.error('Error parsing API response:', error);
    return getFallbackPrediction(data);
  }
}

function getFallbackPrediction(data: PredictionRequest): AIPrediction {
  const prediction = calculatePrediction(
    data.platform,
    data.adType,
    data.days,
    data.dailyBudget,
    data.country,
    data.objective
  );

  return {
    reach: prediction.reach,
    engagement: prediction.engagement,
    confidence: 85,
    trends: {
      growth: 0.12,
      saturation: 0.65,
      competition: 0.75,
      recommendation: getDefaultRecommendation(data)
    }
  };
}

function getDefaultRecommendation(data: PredictionRequest): string {
  const budget = data.dailyBudget * data.days;
  
  if (budget > 1000) {
    return 'Consider A/B testing different ad variations to optimize performance';
  } else if (budget > 500) {
    return 'Start with targeted audience segments and gradually expand reach';
  } else {
    return 'Focus on highly specific audience targeting to maximize ROI';
  }
}