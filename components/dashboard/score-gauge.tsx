"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"

interface ScoreGaugeProps {
  score: number
}

function getGaugeColor(score: number): string {
  if (score < 30) return "#EF4444"
  if (score < 60) return "#F59E0B"
  return "#22C55E"
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

const RADIUS = 46
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function usePrefersReducedMotion() {
  const subscribe = useCallback((cb: () => void) => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    mq.addEventListener("change", cb)
    return () => mq.removeEventListener("change", cb)
  }, [])
  const getSnapshot = useCallback(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    []
  )
  const getServerSnapshot = useCallback(() => false, [])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [displayScore, setDisplayScore] = useState(
    prefersReducedMotion ? score : 0
  )
  const [dashOffset, setDashOffset] = useState(
    prefersReducedMotion ? CIRCUMFERENCE * (1 - score / 100) : CIRCUMFERENCE
  )
  const animationRef = useRef<number>(0)
  const color = getGaugeColor(score)

  useEffect(() => {
    if (prefersReducedMotion) return

    const duration = 1200
    const delay = 500
    let startTime: number | null = null

    const timeout = setTimeout(() => {
      function animate(timestamp: number) {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        const currentScore = Math.round(easedProgress * score)
        setDisplayScore(currentScore)
        setDashOffset(CIRCUMFERENCE * (1 - easedProgress * (score / 100)))

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(animationRef.current)
    }
  }, [score, prefersReducedMotion])

  return (
    <svg
      viewBox="0 0 120 120"
      className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]"
      role="img"
      aria-label={`Skor keberlanjutan: ${score} dari 100`}
    >
      {/* Background track */}
      <circle
        cx="60"
        cy="60"
        r={RADIUS}
        fill="none"
        className="stroke-muted"
        strokeWidth="10"
      />
      {/* Progress arc */}
      <circle
        cx="60"
        cy="60"
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 60 60)"
      />
      {/* Score number */}
      <text
        x="60"
        y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground text-3xl font-bold"
        fontSize="30"
      >
        {displayScore}
      </text>
      {/* /100 label */}
      <text
        x="60"
        y="76"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-muted-foreground"
        fontSize="12"
      >
        / 100
      </text>
    </svg>
  )
}
