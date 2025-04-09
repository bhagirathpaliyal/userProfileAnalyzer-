import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsernameFormProps {
  username: string;
  setUsername: (username: string) => void;
  onSubmit: () => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ username, setUsername, onSubmit }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      };
  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={onSubmit}>Fetch</Button>
    </div>
  );
};

export default UsernameForm;
