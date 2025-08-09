'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useDashboard } from '@/contexts/dashboard-context';
import { generateChartData } from '@/lib/mock-data';
import { useMemo } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

export function PerformanceChart() {
  const { filteredArticles, chartTimeframe, setChartTimeframe } =
    useDashboard();

  const chartData = useMemo(() => {
    return generateChartData(filteredArticles, chartTimeframe);
  }, [filteredArticles, chartTimeframe]);

  const formatXAxisLabel = (tickItem: string) => {
    if (chartTimeframe === 'daily') {
      return new Date(tickItem).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } else {
      return new Date(tickItem + '-01').toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    }
  };

  const totalViews = chartData.reduce((sum, item) => sum + item.views, 0);
  const avgViews = Math.round(totalViews / chartData.length);

  return (
    <Card className='border-0 shadow-sm bg-white'>
      <CardHeader className='pb-4'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-blue-100 rounded-xl'>
              <TrendingUp className='h-5 w-5 text-blue-600' />
            </div>
            <div>
              <CardTitle className='text-xl font-semibold text-slate-900'>
                Performance Analytics
              </CardTitle>
              <p className='text-sm text-slate-600 mt-1'>
                Article views over time
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant={chartTimeframe === 'daily' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setChartTimeframe('daily')}
              className={
                chartTimeframe === 'daily'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'border-slate-200 hover:bg-slate-50'
              }
            >
              <Calendar className='h-4 w-4 mr-1' />
              Daily
            </Button>
            <Button
              variant={chartTimeframe === 'monthly' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setChartTimeframe('monthly')}
              className={
                chartTimeframe === 'monthly'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'border-slate-200 hover:bg-slate-50'
              }
            >
              <Calendar className='h-4 w-4 mr-1' />
              Monthly
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='p-4 bg-slate-50 rounded-xl'>
            <p className='text-sm font-medium text-slate-600'>Total Views</p>
            <p className='text-2xl font-bold text-slate-900 mt-1'>
              {totalViews.toLocaleString()}
            </p>
          </div>
          <div className='p-4 bg-slate-50 rounded-xl'>
            <p className='text-sm font-medium text-slate-600'>Average Views</p>
            <p className='text-2xl font-bold text-slate-900 mt-1'>
              {avgViews.toLocaleString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorViews' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis
                dataKey='date'
                tickFormatter={formatXAxisLabel}
                interval='preserveStartEnd'
                stroke='#64748b'
                fontSize={12}
              />
              <YAxis stroke='#64748b' fontSize={12} />
              <Tooltip
                labelFormatter={(label) => formatXAxisLabel(label)}
                formatter={(value: number) => [value.toLocaleString(), 'Views']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Area
                type='monotone'
                dataKey='views'
                stroke='#3b82f6'
                strokeWidth={3}
                fill='url(#colorViews)'
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: '#3b82f6',
                  strokeWidth: 2,
                  fill: 'white',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
