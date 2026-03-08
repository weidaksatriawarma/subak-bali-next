"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "@/lib/i18n/language-context"
import { COST_LABELS, TIMELINE_LABELS } from "@/lib/constants"
import type {
  RoadmapItem,
  Category,
  Priority,
  EstimatedImpact,
  EstimatedCost,
  Timeline,
} from "@/types/database"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Resolver } from "react-hook-form"

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["energy", "waste", "supply_chain", "operations", "policy"]),
  priority: z.enum(["high", "medium", "low"]),
  estimated_impact: z.enum(["high", "medium", "low"]),
  estimated_cost: z.enum(["free", "low", "medium", "high"]),
  timeline: z.enum(["1_week", "1_month", "3_months", "6_months", "1_year"]),
})

export type RoadmapItemFormValues = z.infer<typeof formSchema>

interface RoadmapItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: RoadmapItem | null
  saving: boolean
  onSave: (values: RoadmapItemFormValues) => void
}

export function RoadmapItemDialog({
  open,
  onOpenChange,
  item,
  saving,
  onSave,
}: RoadmapItemDialogProps) {
  const { t } = useTranslation()
  const common = t.dashboard.common
  const rd = t.dashboard.roadmap

  const isMandatoryEdit = item?.is_mandatory === true

  const form = useForm<RoadmapItemFormValues>({
    resolver: zodResolver(formSchema) as Resolver<RoadmapItemFormValues>,
    values: item
      ? {
          title: item.title,
          description: item.description,
          category: item.category,
          priority: item.priority,
          estimated_impact: item.estimated_impact ?? "medium",
          estimated_cost: item.estimated_cost ?? "low",
          timeline: item.timeline ?? "1_month",
        }
      : {
          title: "",
          description: "",
          category: "operations",
          priority: "medium",
          estimated_impact: "medium",
          estimated_cost: "low",
          timeline: "1_month",
        },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{item ? rd.editItem : rd.addItem}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{rd.form.title}</FormLabel>
                  <FormControl>
                    <Input placeholder={rd.form.titlePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{rd.form.description}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={rd.form.descriptionPlaceholder}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{rd.form.category}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isMandatoryEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={rd.form.selectPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(Object.keys(common.categories) as Category[]).map(
                        (cat) => (
                          <SelectItem key={cat} value={cat}>
                            {common.categories[cat]}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{rd.form.priority}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isMandatoryEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={rd.form.selectPlaceholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(common.priorities) as Priority[]).map(
                          (p) => (
                            <SelectItem key={p} value={p}>
                              {common.priorities[p]}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimated_impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{rd.form.estimatedImpact}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isMandatoryEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={rd.form.selectPlaceholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(common.impacts) as EstimatedImpact[]).map(
                          (i) => (
                            <SelectItem key={i} value={i}>
                              {common.impacts[i]}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="estimated_cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{rd.form.estimatedCost}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isMandatoryEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={rd.form.selectPlaceholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(COST_LABELS) as EstimatedCost[]).map(
                          (c) => (
                            <SelectItem key={c} value={c}>
                              {COST_LABELS[c]}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{rd.form.timeline}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isMandatoryEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={rd.form.selectPlaceholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(TIMELINE_LABELS) as Timeline[]).map(
                          (tl) => (
                            <SelectItem key={tl} value={tl}>
                              {TIMELINE_LABELS[tl]}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={saving}
              >
                {rd.cancelBtn}
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? rd.savingBtn : rd.saveBtn}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
