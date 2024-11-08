import React, { useState, useEffect } from 'react';
import { Calculator, Coins, Globe2, TrendingUp, Target, Users } from 'lucide-react';
import { AdPlatform, AdType, CampaignObjectives, countries, currencies, exchangeRates } from './data';
import { getAIPrediction } from './services/ai';
import type { AIPrediction } from './types';

function App() {
  const [platform, setPlatform] = useState<string>('');
  const [adType, setAdType] = useState<string>('');
  const [days, setDays] = useState<number>(1);
  const [dailyBudget, setDailyBudget] = useState<number>(10);
  const [currency, setCurrency] = useState<string>('USD');
  const [country, setCountry] = useState<string>('');
  const [objective, setObjective] = useState<string>('');
  const [prediction, setPrediction] = useState<AIPrediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Reset dependent fields when platform changes
  useEffect(() => {
    setAdType('');
    setObjective('');
  }, [platform]);

  // Reset objective when ad type changes
  useEffect(() => {
    setObjective('');
  }, [adType]);

  useEffect(() => {
    async function getPrediction() {
      if (platform && adType && days && dailyBudget && country && objective) {
        setLoading(true);
        try {
          // Convert budget to USD for prediction
          const budgetInUSD = dailyBudget / exchangeRates[currency as keyof typeof exchangeRates];
          
          const result = await getAIPrediction({
            platform,
            adType,
            days,
            dailyBudget: budgetInUSD,
            country,
            objective
          });
          setPrediction(result);
        } catch (error) {
          console.error('Prediction error:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    getPrediction();
  }, [platform, adType, days, dailyBudget, country, objective, currency]);

  const availableObjectives = platform && adType ? CampaignObjectives[platform]?.[adType] || [] : [];
  const selectedCurrency = currencies.find(c => c.code === currency);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              AI-Powered Ad Performance Predictor
            </h1>
            <p className="text-gray-600">
              Predict your advertising campaign performance with artificial intelligence
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Platform</option>
                    {AdPlatform.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Type
                  </label>
                  <select
                    value={adType}
                    onChange={(e) => setAdType(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                    disabled={!platform}
                  >
                    <option value="">Select Ad Type</option>
                    {AdType[platform]?.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Budget
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={dailyBudget}
                      onChange={(e) => setDailyBudget(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Objective
                  </label>
                  <select
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-indigo-500"
                    disabled={!platform || !adType}
                  >
                    <option value="">Select Objective</option>
                    {availableObjectives.map((obj) => (
                      <option key={obj.value} value={obj.value}>
                        {obj.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing with AI...</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Prediction Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Globe2 className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Total Reach</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{prediction.reach.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Estimated Engagement</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{prediction.engagement.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Coins className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Total Budget</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(days * dailyBudget)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Market Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Growth Potential</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${prediction.trends.growth * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Market Saturation</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${prediction.trends.saturation * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-800">AI Recommendation:</p>
                  <p className="text-sm text-gray-600">{prediction.trends.recommendation}</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Prediction confidence: {prediction.confidence}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;