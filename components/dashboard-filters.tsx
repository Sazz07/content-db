'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, X, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import {
  DashboardContextType,
  useDashboard,
} from '@/contexts/dashboard-context';
import { cn } from '@/lib/utils';

export function DashboardFilters() {
  const {
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
    articles,
  } = useDashboard();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(debouncedSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, setSearchTerm]);

  const authors = Array.from(
    new Set(articles.map((article) => article.author))
  );

  const clearFilters = () => {
    setDebouncedSearchTerm('');
    setAuthorFilter('');
    setDateRange({ from: null, to: null });
  };

  const hasActiveFilters =
    debouncedSearchTerm || authorFilter || dateRange.from || dateRange.to;

  return (
    <div className='space-y-6'>
      <Card className='border-0 shadow-sm bg-white'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold flex items-center'>
              <Filter className='h-5 w-5 mr-2 text-blue-600' />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant='ghost'
                size='sm'
                onClick={clearFilters}
                className='text-slate-500 hover:text-slate-700'
              >
                <X className='h-4 w-4 mr-1' />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label
              htmlFor='search'
              className='text-sm font-medium text-slate-700'
            >
              Search Articles
            </Label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <Input
                id='search'
                placeholder='Search by title...'
                value={debouncedSearchTerm}
                onChange={(e) => setDebouncedSearchTerm(e.target.value)}
                className='pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label className='text-sm font-medium text-slate-700'>Author</Label>
            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                <SelectValue placeholder='All authors' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-3'>
            <Label className='text-sm font-medium text-slate-700'>
              Date Range
            </Label>
            <div className='grid grid-cols-1 gap-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'justify-start text-left font-normal border-slate-200 hover:bg-slate-50',
                      !dateRange.from && 'text-slate-500'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {dateRange.from
                      ? format(dateRange.from, 'MMM dd, yyyy')
                      : 'From date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={dateRange.from || undefined}
                    onSelect={(date) =>
                      setDateRange({ ...dateRange, from: date || null })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'justify-start text-left font-normal border-slate-200 hover:bg-slate-50',
                      !dateRange.to && 'text-slate-500'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {dateRange.to
                      ? format(dateRange.to, 'MMM dd, yyyy')
                      : 'To date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={dateRange.to || undefined}
                    onSelect={(date) =>
                      setDateRange({ ...dateRange, to: date || null })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <div className='space-y-2'>
              <Label className='text-sm font-medium text-slate-700'>
                Sort By
              </Label>
              <Select
                value={sortBy}
                onValueChange={(value: DashboardContextType['sortBy']) =>
                  setSortBy(value)
                }
              >
                <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='publishedDate'>Published Date</SelectItem>
                  <SelectItem value='views'>Views</SelectItem>
                  <SelectItem value='likes'>Likes</SelectItem>
                  <SelectItem value='comments'>Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium text-slate-700'>
                Order
              </Label>
              <Select
                value={sortOrder}
                onValueChange={(value: DashboardContextType['sortOrder']) =>
                  setSortOrder(value)
                }
              >
                <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='desc'>Highest First</SelectItem>
                  <SelectItem value='asc'>Lowest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
