export function getTierGradient(score: number): [string, string] {
  if (score >= 80) return ["#059669", "#047857"]
  if (score >= 60) return ["#d97706", "#b45309"]
  if (score >= 30) return ["#6b7280", "#4b5563"]
  return ["#92400e", "#78350f"]
}

export function getTierName(score: number): string {
  if (score >= 80) return "EMERALD"
  if (score >= 60) return "GOLD"
  if (score >= 30) return "SILVER"
  return "BRONZE"
}

export function getTierBgClass(score: number): string {
  if (score >= 80) return "from-emerald-600 to-emerald-800"
  if (score >= 60) return "from-amber-600 to-amber-800"
  if (score >= 30) return "from-gray-500 to-gray-700"
  return "from-orange-700 to-orange-900"
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (ctx.measureText(text).width <= maxWidth) return text
  let truncated = text
  while (
    ctx.measureText(truncated + "...").width > maxWidth &&
    truncated.length > 0
  ) {
    truncated = truncated.slice(0, -1)
  }
  return truncated + "..."
}

export function drawLeafDecoration(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  alpha: number
) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = "rgba(255,255,255,0.15)"
  ctx.translate(cx, cy)

  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.bezierCurveTo(size * 0.6, -size * 0.6, size * 0.8, size * 0.2, 0, size)
  ctx.bezierCurveTo(-size * 0.8, size * 0.2, -size * 0.6, -size * 0.6, 0, -size)
  ctx.fill()

  ctx.strokeStyle = "rgba(255,255,255,0.08)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.8)
  ctx.lineTo(0, size * 0.8)
  ctx.stroke()

  ctx.restore()
}
