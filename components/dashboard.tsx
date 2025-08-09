'use client';

import { DashboardProvider } from '@/contexts/dashboard-context';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardStats } from '@/components/dashboard-stats';
import { DashboardFilters } from '@/components/dashboard-filters';
import { ArticlesTable } from '@/components/articles-table';
import { PerformanceChart } from '@/components/performance-chart';

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className='min-h-screen bg-slate-50'>
        <DashboardHeader />
        <main className='container mx-auto px-4 py-8 max-w-7xl'>
          <div className='space-y-8'>
            <DashboardStats />

            <div className='grid grid-cols-1 xl:grid-cols-4 gap-8'>
              <div className='xl:col-span-3 space-y-8'>
                <PerformanceChart />
                <ArticlesTable />
              </div>
              <div className='xl:col-span-1'>
                <DashboardFilters />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
}
