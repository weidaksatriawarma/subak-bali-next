import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status })
}

export function apiError(
  message: string,
  status: number,
  detail?: unknown
) {
  if (detail) {
    logger.error(`[API Error] ${status}: ${message}`, {
      detail:
        detail instanceof Error
          ? { message: detail.message, stack: detail.stack }
          : detail,
    })
  }
  return NextResponse.json({ error: message }, { status })
}
