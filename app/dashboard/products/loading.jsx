import { Skeleton } from "@/components/ui/skeleton";

function ProductsPageSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="flex gap-3 justify-between">
        <Skeleton className="bg-accent1-100 h-[25px] w-full" />
        <Skeleton className="bg-accent1-100 h-[25px] w-24" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton key={index} className="bg-accent1-100 h-[125px] w-full" />
        ))}
      </div>
    </div>
  );
}

export default ProductsPageSkeleton;
