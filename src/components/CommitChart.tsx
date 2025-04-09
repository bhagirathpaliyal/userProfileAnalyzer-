import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CommitChartProps {
  username: string;
  repoName: string;
  repos: Repo[];
  setSelectedRepo: (repoName: string) => void;
}

interface CommitData {
  date: string;
  commits: number;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}
const CommitChart: React.FC<CommitChartProps> = ({
  username,
  repoName,
  repos,
  setSelectedRepo,
}) => {
  const [data, setData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`
        );
        if (!res.ok) throw new Error("Could not fetch commits");
        const commits = await res.json();

        const dateMap: Record<string, number> = {};
        commits.forEach((commit: any) => {
          const date = commit.commit.author.date.slice(0, 10);
          dateMap[date] = (dateMap[date] || 0) + 1;
        });

        const chartData: CommitData[] = Object.entries(dateMap).map(
          ([date, count]) => ({
            date,
            commits: count,
          })
        );

        chartData.sort((a, b) => a.date.localeCompare(b.date));

        setData(chartData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username && repoName) {
      fetchCommits();
    }
  }, [username, repoName]);

  
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="my-6 w-[50%] max-md:w-full">
      <h2 className="text-xl font-bold mb-4">Daily Commits Chart</h2>
      {repos.length > 0 && (
        <div className="mb-4 flex max-sm:flex-col sm:items-center ">
          <label className="mr-2 font-medium">Select Repo:</label>
          <select
            value={repoName}
            onChange={(e) => setSelectedRepo(e.target.value)}
            className="border rounded p-1"
          >
            {repos.map((repo) => (
              <option key={repo.id} value={repo.name}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {data.length === 0 ? (
        <p>No commits found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ left: -25 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="commits" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CommitChart;
