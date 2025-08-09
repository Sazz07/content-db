'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';
import { FileText, Eye, Heart, TrendingUp } from 'lucide-react';

export function DashboardStats() {
  const { articles, filteredArticles } = useDashboard();

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
  const totalComments = articles.reduce(
    (sum, article) => sum + article.comments,
    0
  );
  const publishedArticles = articles.filter(
    (article) => article.status === 'Published'
  ).length;

  const stats = [
    {
      title: 'Total Articles',
      value: articles.length.toLocaleString(),
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Published',
      value: publishedArticles.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: 'bg-purple-500',
      change: '+23%',
    },
    {
      title: 'Engagement',
      value: (totalLikes + totalComments).toLocaleString(),
      icon: Heart,
      color: 'bg-pink-500',
      change: '+15%',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className='border-0 shadow-sm bg-white hover:shadow-md transition-shadow'
        >
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>
                  {stat.title}
                </p>
                <p className='text-3xl font-bold text-slate-900 mt-2'>
                  {stat.value}
                </p>
                <p className='text-sm text-green-600 mt-1 font-medium'>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className='h-6 w-6 text-white' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
