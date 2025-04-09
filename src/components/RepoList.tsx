import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface Repo {
    id: number;
    name: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
  }
interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div className="flex flex-col gap-4">
      {repos.map((repo) => (
        <Card key={repo.id}>
          <CardContent className="p-4">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold"
            >
              {repo.name}
            </a>
            <p>Language: {repo.language}</p>
            <p>⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RepoList;
