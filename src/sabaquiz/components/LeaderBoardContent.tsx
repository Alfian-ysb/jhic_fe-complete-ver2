import React from "react";
import { useNavigate } from "react-router-dom";
import { Bronze, Silver, Gold, Diamond, Ruby } from "./rankLogo";

const userRank = {
  rank: 508,
  name: "Kamu Sendiri",
  score: 40000000000,
  avatar: "https://randomuser.me/api/portraits/men/45.jpg",
};

type Player = {
  id: number;
  name: string;
  score: number;
};

type Props = {
  data: Player[];
};

// fungsi menentukan komponen logo berdasarkan skor
const getRankLogo = (score: number, height: string, width: string) => {
  if (score >= 30000) return <Ruby height={height} width={width} />;
  if (score >= 18000) return <Diamond height={height} width={width} />;
  if (score >= 11000) return <Gold height={height} width={width} />;
  if (score >= 2000) return <Silver height={height} width={width} />;
  return <Bronze height={height} width={width} />;
};

const LeaderBoardContent: React.FC<Props> = ({ data }) => {
  const sorted = [...data].sort((a, b) => b.score - a.score);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-yellow-50 to-purple-50 px-2 md:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-6 mb-6 gap-4">
        <button
          onClick={() => navigate("/sabaquiz")}
          className="bg-blue-100 hover:bg-blue-300 text-gray-800 text-sm font-bold px-6 py-2 rounded-full transition flex items-center gap-2 shadow"
        >
          <span className="text-lg">&lt;</span> Home
        </button>
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-300 shadow">
          <img
            src={userRank.avatar}
            alt="Your Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-10">
        {/* Your League */}
        <div className="w-full md:w-1/3 flex flex-col items-center mt-8 md:mt-0">
          <h2 className="text-xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Liga Anda
          </h2>
          {getRankLogo(userRank.score, "25rem", "23rem")}

          <div className="flex flex-col items-center w-full">
            <span className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full mb-2 shadow text-xs sm:text-base">
              Rank Anda #{userRank.rank}
            </span>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-full font-bold shadow transition text-xs sm:text-base"
              onClick={() => navigate("/sabaquiz")}
            >
              Kembangkan Skor
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="w-full md:w-2/3 relative mx-auto pb-20">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <svg
              className="w-8 h-8 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 14l-6.16 3.25 1.18-7.19L.36 6.91l7.22-1.05L10 .25l2.42 5.61 7.22 1.05-5.66 3.15 1.18 7.19z" />
            </svg>
            Leaderboard
          </h2>

          {/* Scrollable list */}
          <div className="rounded-t-xl overflow-y-auto shadow bg-white/80 w-full max-h-[calc(100vh-15rem)] overscroll-contain">
            {sorted.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-3 sm:px-4 py-3 border-b last:border-b-0 hover:bg-blue-50 transition"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span>{index + 1}</span>
                  {getRankLogo(item.score, "3rem", "4rem")}
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shadow">
                    <img
                      src={
                        item.name
                          ? `https://randomuser.me/api/portraits/men/${30 + index}.jpg`
                          : `https://ui-avatars.com/api/?background=random&name=User`
                      }
                      alt={item.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-800 text-sm sm:text-lg font-medium truncate max-w-[100px]">
                    {item.name || "User"}
                  </span>
                </div>
                <span className="text-sm sm:text-lg font-semibold text-blue-700 pl-2 sm:pl-0">
                  {item.score}
                </span>
              </div>
            ))}
          </div>

          {/* Fixed footer highlight */}
          <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-auto md:w-[calc(66.666%-3.5rem)] z-50">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 text-white px-3 sm:px-4 py-3 font-bold shadow-lg backdrop-blur-md bg-opacity-80">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="font-semibold w-10 sm:w-12">#{userRank.rank}</span>
                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow">
                  <img
                    src={userRank.avatar}
                    alt={userRank.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-black text-sm sm:text-lg truncate max-w-24">
                  {userRank.name}
                  <span className="ml-2 bg-white/30 text-xs px-2 py-1 rounded">
                    Anda
                  </span>
                </span>
              </div>
              <span className="text-lg font-extrabold">{userRank.score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardContent;