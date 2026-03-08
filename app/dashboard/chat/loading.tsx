import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex justify-end">
          <Skeleton className="h-16 w-3/4 rounded-xl" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-24 w-3/4 rounded-xl" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-12 w-2/3 rounded-xl" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-20 w-3/4 rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  )
}
