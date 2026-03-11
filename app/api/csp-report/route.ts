import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const report = body["csp-report"] ?? body
    console.log(
      JSON.stringify({
        csp_violation: true,
        blocked_uri: report["blocked-uri"],
        violated_directive: report["violated-directive"],
        document_uri: report["document-uri"],
        timestamp: new Date().toISOString(),
      })
    )
  } catch {
    // Malformed report — ignore silently
  }
  return new NextResponse(null, { status: 204 })
}
