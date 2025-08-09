import { DashboardProvider } from '@/contexts/dashboard-context';
import React from 'react';
import { DashboardHeader } from './dashboard-header';
import { DashboardStats } from './dashboard-stats';
import { PerformanceChart } from './performance-chart';
import { ArticlesTable } from './articles-table';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className='min-h-screen bg-slate-50'>
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
