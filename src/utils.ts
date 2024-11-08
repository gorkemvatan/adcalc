interface Prediction {
  reach: number;
  engagement: number;
}

const baseMetrics = {
  instagram: { reachMultiplier: 2.5, engagementRate: 0.06 },
  facebook: { reachMultiplier: 3.0, engagementRate: 0.04 },
  twitter: { reachMultiplier: 2.0, engagementRate: 0.03 },
  linkedin: { reachMultiplier: 1.5, engagementRate: 0.05 },
  google: { reachMultiplier: 4.0, engagementRate: 0.02 },
  youtube: { reachMultiplier: 2.8, engagementRate: 0.05 }
};

const countryMultipliers: Record<string, number> = {
  US: 1.2,
  GB: 1.1,
  DE: 1.0,
  TR: 0.8,
  FR: 1.0,
  IT: 0.9,
  ES: 0.9,
  CA: 1.1,
  AU: 1.0,
  JP: 1.1
};

export function calculatePrediction(
  platform: string,
  adType: string,
  days: number,
  dailyBudget: number,
  country: string,
  objective: string
): Prediction {
  const metrics = baseMetrics[platform as keyof typeof baseMetrics];
  const countryMultiplier = countryMultipliers[country] || 1.0;
  
  // Base reach calculation
  let baseReach = dailyBudget * days * metrics.reachMultiplier * countryMultiplier;
  
  // Adjust based on ad type
  const adTypeMultiplier = getAdTypeMultiplier(platform, adType);
  baseReach *= adTypeMultiplier;
  
  // Adjust based on objective
  const { reachMultiplier, engagementMultiplier } = getObjectiveMultipliers(objective);
  const finalReach = Math.round(baseReach * reachMultiplier);
  const engagement = Math.round(finalReach * metrics.engagementRate * engagementMultiplier);
  
  return {
    reach: finalReach,
    engagement: engagement
  };
}

function getAdTypeMultiplier(platform: string, adType: string): number {
  const multipliers: Record<string, Record<string, number>> = {
    instagram: {
      story: 1.2,
      feed: 1.0,
      reels: 1.4,
      explore: 1.1
    },
    facebook: {
      feed: 1.0,
      story: 1.1,
      marketplace: 0.9,
      messenger: 0.8
    },
    twitter: {
      promoted_tweets: 1.0,
      follower: 0.9,
      trend: 1.3
    },
    linkedin: {
      sponsored_content: 1.0,
      message_ads: 0.8,
      text_ads: 0.7
    },
    google: {
      search: 1.0,
      display: 1.2,
      shopping: 0.9
    },
    youtube: {
      skippable: 1.0,
      non_skippable: 1.2,
      shorts: 1.3,
      discovery: 0.9
    }
  };

  return multipliers[platform]?.[adType] || 1.0;
}

function getObjectiveMultipliers(objective: string): { reachMultiplier: number; engagementMultiplier: number } {
  const multipliers = {
    reach: { reach: 1.2, engagement: 0.8 },
    clicks: { reach: 0.9, engagement: 1.1 },
    impressions: { reach: 1.1, engagement: 0.9 },
    engagement: { reach: 0.8, engagement: 1.3 }
  };

  return multipliers[objective as keyof typeof multipliers] || { reachMultiplier: 1.0, engagementMultiplier: 1.0 };
}