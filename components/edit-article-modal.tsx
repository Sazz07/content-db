"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2, Save } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"
import { editArticleSchema, type EditArticleFormData } from "@/lib/validations"
import type { Article } from "@/lib/mock-data"

interface EditArticleModalProps {
  article: Article
  onClose: () => void
}

export function EditArticleModal({ article, onClose }: EditArticleModalProps) {
  const { updateArticle } = useDashboard()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<EditArticleFormData>({
    resolver: zodResolver(editArticleSchema),
    defaultValues: {
      title: article.title,
      content: article.content,
      status: article.status,
    },
  })

  const watchedStatus = watch("status")

  const onSubmit = async (data: EditArticleFormData) => {
    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateArticle(article.id, {
      title: data.title.trim(),
      content: data.content.trim(),
      status: data.status,
    })

    setShowSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      setShowSuccess(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-slate-900">Edit Article</DialogTitle>
          <p className="text-sm text-slate-600 mt-1">Make changes to your article content and settings</p>
        </DialogHeader>

        {showSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">
              Article updated successfully! Changes have been saved.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700">
              Title *
            </Label>
            <Input
              id="title"
              {...register("title")}
              className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Enter article title"
            />
            {errors.title && <p className="text-sm text-red-600 flex items-center mt-1">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-slate-700">
              Content *
            </Label>
            <Textarea
              id="content"
              {...register("content")}
              rows={12}
              className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 resize-none ${
                errors.content ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Write your article content here..."
            />
            {errors.content && <p className="text-sm text-red-600 flex items-center mt-1">{errors.content.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-slate-700">
              Status
            </Label>
            <Select
              value={watchedStatus}
              onValueChange={(value: "Published" | "Draft") => setValue("status", value, { shouldDirty: true })}
            >
              <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Published">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Published
                  </div>
                </SelectItem>
                <SelectItem value="Draft">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Draft
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-200 hover:bg-slate-50 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={showSuccess || isSubmitting || !isDirty}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isSubmitting && <Save className="mr-2 h-4 w-4" />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
