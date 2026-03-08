export interface StreakResult {
  currentStreak: number
  longestStreak: number
  isActiveThisWeek: boolean
}

function getISOWeek(date: Date): string {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
  const week1 = new Date(d.getFullYear(), 0, 4)
  const weekNum =
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`
}

export function computeWeeklyStreak(
  items: { completed_at: string | null }[]
): StreakResult {
  const completedDates = items
    .filter((i) => i.completed_at)
    .map((i) => new Date(i.completed_at!))

  if (completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveThisWeek: false }
  }

  // Get unique weeks with completions
  const weekSet = new Set(completedDates.map(getISOWeek))
  const weeks = Array.from(weekSet).sort()

  const currentWeek = getISOWeek(new Date())
  const isActiveThisWeek = weekSet.has(currentWeek)

  // Count current streak (consecutive weeks backward from current/last active)
  let currentStreak = 0
  const checkWeek = isActiveThisWeek ? currentWeek : weeks[weeks.length - 1]

  // Parse the check week to iterate backward
  const [year, weekStr] = checkWeek.split("-W")
  let y = parseInt(year)
  let w = parseInt(weekStr)

  while (weekSet.has(`${y}-W${String(w).padStart(2, "0")}`)) {
    currentStreak++
    w--
    if (w < 1) {
      y--
      w = 52 // Approximate; good enough for streak counting
    }
  }

  // If not active this week, current streak is 0 (streak broken)
  if (!isActiveThisWeek) {
    currentStreak = 0
  }

  // Count longest streak
  let longestStreak = 0
  let streak = 1
  for (let i = 1; i < weeks.length; i++) {
    const [prevY, prevW] = weeks[i - 1].split("-W").map(Number)
    const [curY, curW] = weeks[i].split("-W").map(Number)
    const isConsecutive =
      (curY === prevY && curW === prevW + 1) ||
      (curY === prevY + 1 && curW === 1 && prevW >= 51)
    if (isConsecutive) {
      streak++
    } else {
      longestStreak = Math.max(longestStreak, streak)
      streak = 1
    }
  }
  longestStreak = Math.max(longestStreak, streak)

  return { currentStreak, longestStreak, isActiveThisWeek }
}
