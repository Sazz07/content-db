"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Heart, MessageCircle, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"
import { useAuth } from "@/contexts/auth-context"
import { EditArticleModal } from "@/components/edit-article-modal"
import type { Article } from "@/lib/mock-data"

export function ArticlesTable() {
  const { user } = useAuth()
  const { filteredArticles, currentPage, setCurrentPage, itemsPerPage } = useDashboard()

  const [editingArticle, setEditingArticle] = useState<Article | null>(null)

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const canEdit = user?.role === "admin" || user?.role === "editor"

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toLocaleString()
  }

  return (
    <>
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Articles ({filteredArticles.length})
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Title</TableHead>
                  <TableHead className="font-semibold text-slate-700">Author</TableHead>
                  <TableHead className="font-semibold text-slate-700">Published</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">
                    <div className="flex items-center justify-center">
                      <Eye className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">
                    <div className="flex items-center justify-center">
                      <Heart className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">
                    <div className="flex items-center justify-center">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                  </TableHead>
                  {canEdit && <TableHead className="font-semibold text-slate-700">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentArticles.map((article) => (
                  <TableRow key={article.id} className="border-slate-100 hover:bg-slate-50/50">
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate" title={article.title}>
                        {article.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{article.author}</TableCell>
                    <TableCell className="text-slate-600">{formatDate(article.publishedDate)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={article.status === "Published" ? "default" : "secondary"}
                        className={
                          article.status === "Published"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }
                      >
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      {formatNumber(article.views)}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      {formatNumber(article.likes)}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      {formatNumber(article.comments)}
                    </TableCell>
                    {canEdit && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingArticle(article)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-slate-200 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum ? "bg-blue-600 hover:bg-blue-700" : "border-slate-200 hover:bg-slate-50"
                      }
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-slate-200 hover:bg-slate-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {editingArticle && <EditArticleModal article={editingArticle} onClose={() => setEditingArticle(null)} />}
    </>
  )
}
