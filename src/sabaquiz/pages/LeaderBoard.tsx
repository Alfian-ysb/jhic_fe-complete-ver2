import React, { useState, useEffect } from "react";
import LeaderBoardContent from "../components/LeaderBoardContent";
import { API_ENDPOINTS, apiCall } from "../utils/api";

interface LeaderboardItem {
  id: number;
  name: string;
  score: number;
}

const LeaderBoard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiCall(API_ENDPOINTS.leaderboard);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: LeaderboardItem[] = await response.json();
        // Optional: urutkan berdasarkan score descending
        const sortedData = data.sort((a, b) => b.score - a.score);

        setLeaderboardData(sortedData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <LeaderBoardContent data={leaderboardData} />
    </div>
  );
};

export default LeaderBoard;
