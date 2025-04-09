import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CommitChartSkeleton: React.FC = () => {
  return (
    <div className="w-[50%] space-y-4 mt-6">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-1/2" /> 
      <Skeleton className="h-[300px] w-full rounded-md" />
    </div>
  );
};

export default CommitChartSkeleton;
