"use client"

import type { UIMessage } from "ai"
import { isToolUIPart } from "ai"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { User, Leaf, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

function ToolResultCard({ output }: { output: Record<string, unknown> }) {
  const type = output.type as string

  if (type === "carbon_calculation") {
    const breakdown = output.breakdown as {
      category: string
      co2Kg: number
      percentage: number
    }[]
    return (
      <div className="my-2 rounded-lg border bg-green-50/50 p-3 dark:bg-green-950/20">
        <p className="mb-2 text-xs font-semibold text-green-700 uppercase dark:text-green-400">
          Jejak Karbon
        </p>
        <p className="mb-2 text-lg font-bold text-green-700 dark:text-green-400">
          {(output.totalCO2 as number).toLocaleString("id-ID")} kg CO₂/tahun
        </p>
        <div className="mb-2 space-y-1">
          {breakdown.map((b) => (
            <div key={b.category} className="flex items-center gap-2 text-xs">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-green-200 dark:bg-green-900">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${b.percentage}%` }}
                />
              </div>
              <span className="w-24 text-muted-foreground">
                {b.category}: {b.co2Kg.toLocaleString("id-ID")} kg
              </span>
              <span className="w-8 text-right font-medium">
                {b.percentage}%
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Setara {output.treeEquivalent as number} pohon/tahun
        </p>
      </div>
    )
  }

  if (type === "regulation_lookup") {
    const regulations = output.regulations as
      | {
          name: string
          number: string
          summary: string
          requirements: string[]
          tips: string[]
        }[]
      | undefined
    if (!regulations?.length) return null
    return (
      <div className="my-2 space-y-2">
        {regulations.map((reg) => (
          <div
            key={reg.number}
            className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20"
          >
            <p className="text-xs font-semibold text-blue-700 uppercase dark:text-blue-400">
              {reg.number}
            </p>
            <p className="mb-1 text-sm font-medium">{reg.name}</p>
            <p className="mb-2 text-xs text-muted-foreground">{reg.summary}</p>
            <div className="text-xs">
              <p className="font-medium">Persyaratan:</p>
              <ul className="ml-3 list-disc text-muted-foreground">
                {reg.requirements.slice(0, 3).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "industry_benchmark") {
    const benchmark = output.benchmark as {
      averageScore: number
      topPerformerScore: number
      categoryAverages: Record<string, number>
    }
    const categoryLabels: Record<string, string> = {
      energy: "Energi",
      waste: "Limbah",
      supplyChain: "Rantai Pasok",
      operations: "Operasional",
      policy: "Kebijakan",
    }
    return (
      <div className="my-2 rounded-lg border bg-purple-50/50 p-3 dark:bg-purple-950/20">
        <p className="mb-2 text-xs font-semibold text-purple-700 uppercase dark:text-purple-400">
          Benchmark Industri
        </p>
        <div className="mb-2 flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Rata-rata: </span>
            <span className="font-bold">{benchmark.averageScore}/100</span>
          </div>
          <div>
            <span className="text-muted-foreground">Top: </span>
            <span className="font-bold">{benchmark.topPerformerScore}/100</span>
          </div>
        </div>
        <div className="space-y-1">
          {Object.entries(benchmark.categoryAverages).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span className="w-20 text-muted-foreground">
                {categoryLabels[key] ?? key}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-purple-200 dark:bg-purple-900">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className="w-6 text-right font-medium">{val}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Generic fallback
  return (
    <div className="my-2 rounded-lg border bg-muted/50 p-3 text-xs">
      <pre className="overflow-x-auto">{JSON.stringify(output, null, 2)}</pre>
    </div>
  )
}

interface ChatMessageProps {
  message: UIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-2 py-3 sm:gap-3",
        isUser && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[90%] rounded-2xl px-3 py-2 text-sm sm:max-w-[80%] sm:px-4 sm:py-2.5",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {message.parts?.map((part, i) => {
          if (part.type === "text") {
            if (isUser) {
              return (
                <span key={i} className="whitespace-pre-wrap">
                  {part.text}
                </span>
              )
            }
            return (
              <div
                key={i}
                className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {part.text}
                </ReactMarkdown>
              </div>
            )
          }
          if (isToolUIPart(part)) {
            if (part.state === "output-available" && part.output) {
              return (
                <ToolResultCard
                  key={i}
                  output={part.output as Record<string, unknown>}
                />
              )
            }
            // Tool is being called
            if (
              part.state === "input-streaming" ||
              part.state === "input-available"
            ) {
              return (
                <div
                  key={i}
                  className="my-1 flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Menganalisis data...</span>
                </div>
              )
            }
            return null
          }
          return null
        })}
      </div>
    </div>
  )
}
