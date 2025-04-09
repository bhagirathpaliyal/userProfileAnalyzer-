import React, { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import RepoList from "./components/RepoList";
import CommitChart from "./components/CommitChart";
import RepoListSkeleton from "./components/RepoListSkeleton";
import CommitChartSkeleton from "./components/CommitChartSkeleton";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string>("");

  const fetchRepos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setRepos(data);
      if (data.length > 0) {
        setSelectedRepo(data[0].name); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 


  return (
    <div className="max-w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub User Profile Analyzer</h1>
      <UsernameForm
        username={username}
        setUsername={setUsername}
        onSubmit={fetchRepos}
      />
      <div className="flex max-md:flex-col w-full gap-[20px]">
      
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-y-auto scroll-hidden max-h-[500px] w-1/2 max-md:w-full pr-2">
      {loading ? <RepoListSkeleton /> : <RepoList repos={repos} />}
  </div>
     
      {repos.length > 0 && ( loading ? (
    <CommitChartSkeleton />
  ) : (
    <CommitChart
      username={username}
      repoName={selectedRepo}
      repos={repos}
      setSelectedRepo={setSelectedRepo}
    />
  )
)}
      </div>
    </div>
  );
};

export default App;
