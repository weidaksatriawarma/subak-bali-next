"use client"

import { useState } from "react"
import type { UIMessage } from "ai"
import { isToolUIPart } from "ai"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { User, Leaf, Copy, Check, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/language-context"

function ToolResultCard({ output }: { output: Record<string, unknown> }) {
  const { t } = useTranslation()
  const cm = t.dashboard.chatMessage
  const categories = t.dashboard.common.categories
  const type = output.type as string

  // Map camelCase keys from tool output to underscore keys in i18n
  const categoryLabels: Record<string, string> = {
    energy: categories.energy,
    waste: categories.waste,
    supplyChain: categories.supply_chain,
    supply_chain: categories.supply_chain,
    operations: categories.operations,
    policy: categories.policy,
  }

  if (type === "carbon_calculation") {
    const breakdown = output.breakdown as {
      category: string
      co2Kg: number
      percentage: number
    }[]
    return (
      <div className="my-2 rounded-lg border bg-green-50/50 p-3 dark:bg-green-950/20">
        <p className="mb-2 text-xs font-semibold text-green-700 uppercase dark:text-green-400">
          {cm.carbonFootprint}
        </p>
        <p className="mb-2 text-lg font-bold text-green-700 dark:text-green-400">
          {(output.totalCO2 as number).toLocaleString("id-ID")} {cm.kgCo2Year}
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
          {cm.equivalent} {output.treeEquivalent as number} {cm.treesYear}
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
              <p className="font-medium">{cm.requirements}:</p>
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
    return (
      <div className="my-2 rounded-lg border bg-purple-50/50 p-3 dark:bg-purple-950/20">
        <p className="mb-2 text-xs font-semibold text-purple-700 uppercase dark:text-purple-400">
          {cm.industryBenchmark}
        </p>
        <div className="mb-2 flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">{cm.average}: </span>
            <span className="font-bold">{benchmark.averageScore}/100</span>
          </div>
          <div>
            <span className="text-muted-foreground">{cm.top}: </span>
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

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()
  const cm = t.dashboard.chatMessage

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success(cm.codeCopied)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(cm.codeCopyFail)
    }
  }

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-zinc-800">
      <div className="flex items-center justify-between bg-zinc-800 px-3 py-1.5">
        <span className="text-xs text-zinc-400">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              {cm.copied}
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              {cm.copy}
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto bg-zinc-950 p-3 dark:bg-zinc-900">
        <code className="text-sm leading-relaxed text-zinc-100">{code}</code>
      </pre>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-typing-dot h-2 w-2 rounded-full bg-muted-foreground/60"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

const markdownComponents: Components = {
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    if (match) {
      return (
        <CodeBlock
          language={match[1]}
          code={String(children).replace(/\n$/, "")}
        />
      )
    }
    return (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      >
        {children}
      </code>
    )
  },
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5"
      {...props}
    >
      {children}
      <ExternalLink className="inline h-3 w-3 shrink-0" />
    </a>
  ),
}

function CopyButton({ message }: { message: UIMessage }) {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()
  const cm = t.dashboard.chatMessage

  const handleCopy = async () => {
    const text = message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join("\n\n")

    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(cm.messageCopied)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(cm.messageCopyFail)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-0 -bottom-6 rounded-md p-1 text-muted-foreground/60 transition-all hover:text-foreground md:opacity-0 md:group-hover:opacity-100"
      aria-label={cm.copyMessage}
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  )
}

interface ChatMessageProps {
  message: UIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { t } = useTranslation()
  const cm = t.dashboard.chatMessage
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-end gap-2.5 py-1.5 sm:gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-7 w-7 shrink-0 sm:h-8 sm:w-8">
        <AvatarFallback
          className={cn(
            "text-xs",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
          )}
        >
          {isUser ? (
            <User className="h-3.5 w-3.5" />
          ) : (
            <Leaf className="h-3.5 w-3.5" />
          )}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex max-w-[85%] flex-col gap-1 sm:max-w-[75%]")}>
        {!isUser && (
          <span className="ml-1 text-[11px] font-medium text-muted-foreground">
            Subak Hijau
          </span>
        )}
        <div
          className={cn(
            "relative text-sm",
            isUser
              ? "rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-primary-foreground shadow-sm"
              : "group rounded-2xl rounded-bl-md border border-border/50 bg-card px-4 py-3 shadow-sm sm:px-5 sm:py-3.5"
          )}
        >
          {!isUser && <CopyButton message={message} />}
          {message.parts?.map((part, i) => {
            if (part.type === "text") {
              if (isUser) {
                return (
                  <span key={i} className="leading-relaxed whitespace-pre-wrap">
                    {part.text}
                  </span>
                )
              }
              return (
                <div
                  key={i}
                  className="prose dark:prose-invert prose-p:my-2 prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 prose-headings:font-semibold prose-h3:text-base prose-h4:text-sm prose-ul:my-2 prose-ol:my-2 prose-ul:space-y-1 prose-ol:space-y-1 prose-li:my-0 prose-strong:font-semibold prose-strong:text-foreground prose-pre:my-0 prose-hr:my-4 prose-code:before:content-none prose-code:after:content-none prose-table:my-3 prose-table:w-full prose-thead:border-b prose-thead:border-border prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:text-xs prose-th:font-semibold prose-td:border-t prose-td:border-border prose-td:px-3 prose-td:py-2 prose-td:text-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
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
                    <TypingIndicator />
                    <span>{cm.analyzing}</span>
                  </div>
                )
              }
              return null
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
