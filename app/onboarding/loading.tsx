import { Skeleton } from "@/components/ui/skeleton"

export default function OnboardingLoading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center p-4">
      <Skeleton className="mb-6 h-8 w-48" />
      <Skeleton className="mb-8 h-4 w-72" />
      <div className="w-full space-y-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  )
}
