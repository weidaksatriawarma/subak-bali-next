"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"

// ─── FadeInUp ────────────────────────────────────────────────────

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
  duration?: number
}

export function FadeInUp({
  children,
  delay = 0,
  className,
  duration = 0.5,
}: FadeInUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── StaggerContainer ────────────────────────────────────────────

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReduced = useReducedMotion()

  const variants: Variants = prefersReduced
    ? { hidden: {}, visible: {} }
    : {
        ...staggerContainerVariants,
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── StaggerItem ─────────────────────────────────────────────────

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      variants={
        prefersReduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : staggerItemVariants
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── CountUp ─────────────────────────────────────────────────────

interface CountUpProps {
  value: string
  className?: string
}

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReduced = useReducedMotion()

  // Extract numeric part and suffix
  const match = value.match(/^([\d,.]+)\s*(.*)$/)
  const numericStr = match?.[1]?.replace(/,/g, "") ?? ""
  const suffix = match?.[2] ?? value
  const targetNum = parseFloat(numericStr)
  const hasDecimal = numericStr.includes(".")
  const isNumeric = !isNaN(targetNum) && numericStr.length > 0

  if (!isNumeric || prefersReduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <AnimatedNumber
          target={targetNum}
          suffix={suffix ? ` ${suffix}` : ""}
          hasDecimal={hasDecimal}
        />
      ) : (
        "0"
      )}
    </span>
  )
}

function AnimatedNumber({
  target,
  suffix,
  hasDecimal,
}: {
  target: number
  suffix: string
  hasDecimal: boolean
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const duration = 1500
    const startTime = performance.now()

    function update(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * target)
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [target])

  const formatted = hasDecimal
    ? current.toFixed(1)
    : Math.round(current).toLocaleString()

  return (
    <>
      {formatted}
      {suffix}
    </>
  )
}

import { useState, useEffect } from "react"
