export const AdPlatform = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'google', label: 'Google' },
  { value: 'youtube', label: 'YouTube' }
];

export const AdType: Record<string, Array<{ value: string; label: string }>> = {
  instagram: [
    { value: 'story', label: 'Story Ads' },
    { value: 'feed', label: 'Feed Ads' },
    { value: 'reels', label: 'Reels Ads' },
    { value: 'explore', label: 'Explore Ads' }
  ],
  facebook: [
    { value: 'feed', label: 'Feed Ads' },
    { value: 'story', label: 'Story Ads' },
    { value: 'marketplace', label: 'Marketplace Ads' },
    { value: 'messenger', label: 'Messenger Ads' }
  ],
  twitter: [
    { value: 'promoted_tweets', label: 'Promoted Tweets' },
    { value: 'follower', label: 'Follower Ads' },
    { value: 'trend', label: 'Trending Topic Ads' }
  ],
  linkedin: [
    { value: 'sponsored_content', label: 'Sponsored Content' },
    { value: 'message_ads', label: 'Message Ads' },
    { value: 'text_ads', label: 'Text Ads' }
  ],
  google: [
    { value: 'search', label: 'Search Ads' },
    { value: 'display', label: 'Display Ads' },
    { value: 'shopping', label: 'Shopping Ads' }
  ],
  youtube: [
    { value: 'skippable', label: 'Skippable Video Ads' },
    { value: 'non_skippable', label: 'Non-skippable Video Ads' },
    { value: 'shorts', label: 'Shorts Ads' },
    { value: 'discovery', label: 'Discovery Ads' }
  ]
};

export const CampaignObjectives: Record<string, Record<string, Array<{ value: string; label: string }>>> = {
  instagram: {
    story: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' }
    ],
    feed: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'impressions', label: 'Impressions' }
    ],
    reels: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'impressions', label: 'Impressions' }
    ],
    explore: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'impressions', label: 'Impressions' }
    ]
  },
  facebook: {
    feed: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'impressions', label: 'Impressions' }
    ],
    story: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' }
    ],
    marketplace: [
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'engagement', label: 'Engagement' }
    ],
    messenger: [
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' }
    ]
  },
  google: {
    search: [
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'conversions', label: 'Conversions' }
    ],
    display: [
      { value: 'reach', label: 'Reach' },
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'impressions', label: 'Impressions' }
    ],
    shopping: [
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'conversions', label: 'Conversions' }
    ]
  },
  youtube: {
    skippable: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'impressions', label: 'Impressions' }
    ],
    non_skippable: [
      { value: 'reach', label: 'Reach' },
      { value: 'impressions', label: 'Impressions' }
    ],
    shorts: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'impressions', label: 'Impressions' }
    ],
    discovery: [
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'engagement', label: 'Engagement' }
    ]
  },
  twitter: {
    promoted_tweets: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' }
    ],
    follower: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' }
    ],
    trend: [
      { value: 'reach', label: 'Reach' },
      { value: 'impressions', label: 'Impressions' }
    ]
  },
  linkedin: {
    sponsored_content: [
      { value: 'reach', label: 'Reach' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' }
    ],
    message_ads: [
      { value: 'engagement', label: 'Engagement' },
      { value: 'clicks', label: 'Link Clicks' }
    ],
    text_ads: [
      { value: 'clicks', label: 'Link Clicks' },
      { value: 'impressions', label: 'Impressions' }
    ]
  }
};

export const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'TR', name: 'Turkey' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'JP', name: 'Japan' }
];

export const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira' }
];

export const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  TRY: 32.21
};