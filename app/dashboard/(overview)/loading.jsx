import { Skeleton } from "@/components/ui/skeleton";

function OverviewLoadingSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="flex gap-3 justify-between">
        <Skeleton className="bg-accent1-100 h-[25px] w-full" />
        <Skeleton className="bg-accent1-100 h-[25px] w-full" />
      </div>
      <div className="flex gap-3 justify-between">
        <Skeleton className="bg-accent1-100 h-[25px] w-full" />
        <Skeleton className="bg-accent1-100 h-[25px] w-full" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <Skeleton className="bg-accent1-100 h-[125px] w-full" />
        <Skeleton className="bg-accent1-100 h-[125px] w-full" />
        <Skeleton className="bg-accent1-100 h-[125px] w-full" />
        <Skeleton className="bg-accent1-100 h-[125px] w-full" />
      </div>
      <div>
        <Skeleton className="bg-accent1-100 w-full h-[500px]" />
      </div>
      <div>
        <Skeleton className="bg-accent1-100 w-full h-[500px]" />
      </div>
    </div>
  );
}

export default OverviewLoadingSkeleton;
