import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bronze, Silver, Gold, Diamond, Ruby } from '../components/rankLogo';
import { API_ENDPOINTS, apiCall } from '../utils/api';

type League = {
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  bgGradient: string;
  logo: React.ReactNode;
};

const LeagueOverview: React.FC = () => {
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const leagues: League[] = [
    {
      name: 'Bronze',
      minScore: 0,
      maxScore: 1999,
      color: 'from-orange-900 to-orange-700',
      bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
      logo: <Bronze width="120" height="120" />,
    },
    {
      name: 'Silver',
      minScore: 2000,
      maxScore: 10999,
      color: 'from-gray-500 to-gray-400',
      bgGradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
      logo: <Silver width="120" height="120" />,
    },
    {
      name: 'Gold',
      minScore: 11000,
      maxScore: 17999,
      color: 'from-yellow-600 to-yellow-400',
      bgGradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      logo: <Gold width="120" height="120" />,
    },
    {
      name: 'Diamond',
      minScore: 18000,
      maxScore: 29999,
      color: 'from-cyan-500 to-cyan-300',
      bgGradient: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      logo: <Diamond width="120" height="120" />,
    },
    {
      name: 'Ruby',
      minScore: 30000,
      maxScore: Infinity,
      color: 'from-red-700 to-red-500',
      bgGradient: 'bg-gradient-to-br from-red-50 to-red-100',
      logo: <Ruby width="120" height="120" />,
    },
  ];

  // Fetch user stats on mount
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await apiCall(API_ENDPOINTS.myStats);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setUserScore(data.score);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const isCurrentLeague = (league: League) => {
    return userScore !== null && userScore >= league.minScore && userScore <= league.maxScore;
  };

  const isPassed = (league: League) => {
    return userScore !== null && userScore > league.maxScore;
  };

  const formatScore = (score: number) => {
    if (score === Infinity) return '∞';
    return score.toLocaleString();
  };

  const calculateProgress = (league: League) => {
    if (userScore === null || league.maxScore === Infinity) return 100;
    const total = league.maxScore - league.minScore;
    const current = userScore - league.minScore;
    return Math.min((current / total) * 100, 100);
  };

  const getCurrentLeague = () => {
    return leagues.find(isCurrentLeague)?.name || 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your stats...</p>
      </div>
    );
  }

  if (error || userScore === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Failed to load stats'}</p>
          <button
            onClick={() => navigate('/sabaquiz')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/sabaquiz')}
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold px-6 py-2 rounded-full transition flex items-center gap-2 shadow"
          >
            <span className="text-lg">&lt;</span> Home
          </button>
          <h1 className="text-3xl font-bold text-gray-800">League Overview</h1>
          <div className="w-20"></div>
        </div>

        {/* Current Score Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Skor Anda Saat Ini</p>
              <p className="text-4xl font-bold">{formatScore(userScore)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">Liga Anda</p>
              <p className="text-2xl font-bold">{getCurrentLeague()}</p>
            </div>
          </div>
        </div>

        {/* League Cards */}
        <div className="space-y-4">
          {leagues.map((league) => {
            const isCurrent = isCurrentLeague(league);
            const isLeaguePassed = isPassed(league);
            const progress = calculateProgress(league);

            return (
              <div
                key={league.name}
                className={`
                  ${league.bgGradient}
                  ${isCurrent ? 'ring-4 ring-blue-500 scale-105' : 'ring-1 ring-gray-200'}
                  rounded-2xl p-6 transition-all duration-300 relative overflow-hidden
                  ${isCurrent ? 'shadow-2xl' : 'shadow-md hover:shadow-lg'}
                `}
              >
                {/* Current League Badge */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    Liga Anda Sekarang
                  </div>
                )}

                {/* Passed League Badge */}
                {isLeaguePassed && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow">
                    ✓ Sudah Dilewati
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* League Logo */}
                  <div className={`${isCurrent ? 'scale-110' : ''} transition-transform`}>
                    {league.logo}
                  </div>

                  {/* League Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${league.color} bg-clip-text text-transparent`}>
                      {league.name}
                    </h2>
                    <p className="text-gray-700 text-lg mb-3">
                      <span className="font-semibold">{formatScore(league.minScore)}</span>
                      {' - '}
                      <span className="font-semibold">{formatScore(league.maxScore)}</span>
                      {' poin'}
                    </p>

                    {/* Progress Bar (only for current league) */}
                    {isCurrent && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        {league.maxScore !== Infinity && (
                          <p className="text-sm text-gray-600 mt-2">
                            Kurang <span className="font-bold text-blue-600">
                              {formatScore(league.maxScore - userScore + 1)}
                            </span> poin untuk naik ke liga berikutnya!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            Kembali & Tingkatkan Skor
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeagueOverview;