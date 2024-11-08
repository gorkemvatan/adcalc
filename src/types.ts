export interface PredictionRequest {
  platform: string;
  adType: string;
  days: number;
  dailyBudget: number;
  country: string;
  objective: string;
}

export interface AIPrediction {
  reach: number;
  engagement: number;
  confidence: number;
  trends: {
    growth: number;
    saturation: number;
    competition: number;
    recommendation: string;
  };
}