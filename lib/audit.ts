export function auditLog({
  action,
  userId,
  resourceType,
  resourceId,
}: {
  action: string
  userId?: string
  resourceType?: string
  resourceId?: string
}): void {
  console.log(
    JSON.stringify({
      audit: true,
      action,
      userId: userId ?? "anonymous",
      resourceType,
      resourceId,
      timestamp: new Date().toISOString(),
    })
  )
}
