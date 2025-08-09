'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { mockArticles, type Article } from '@/lib/mock-data';

export interface DashboardContextType {
  articles: Article[];
  filteredArticles: Article[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  authorFilter: string;
  setAuthorFilter: (author: string) => void;
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;
  sortBy: 'views' | 'likes' | 'comments' | 'publishedDate';
  setSortBy: (sort: 'views' | 'likes' | 'comments' | 'publishedDate') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  chartTimeframe: 'daily' | 'monthly';
  setChartTimeframe: (timeframe: 'daily' | 'monthly') => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });
  const [sortBy, setSortBy] = useState<
    'views' | 'likes' | 'comments' | 'publishedDate'
  >('publishedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'monthly'>(
    'daily'
  );
  const itemsPerPage = 10;

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesAuthor = !authorFilter || article.author === authorFilter;
      const matchesDateRange =
        (!dateRange.from ||
          new Date(article.publishedDate) >= dateRange.from) &&
        (!dateRange.to || new Date(article.publishedDate) <= dateRange.to);

      return matchesSearch && matchesAuthor && matchesDateRange;
    });

    // Sort articles
    filtered.sort((a, b) => {
      let aValue: number | Date;
      let bValue: number | Date;

      if (sortBy === 'publishedDate') {
        aValue = new Date(a.publishedDate);
        bValue = new Date(b.publishedDate);
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [articles, searchTerm, authorFilter, dateRange, sortBy, sortOrder]);

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, ...updates } : article
      )
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        articles,
        filteredArticles,
        searchTerm,
        setSearchTerm,
        authorFilter,
        setAuthorFilter,
        dateRange,
        setDateRange,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        updateArticle,
        chartTimeframe,
        setChartTimeframe,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
