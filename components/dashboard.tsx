import { DashboardProvider } from '@/contexts/dashboard-context';
import React from 'react';
import { DashboardHeader } from './dashboard-header';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className='min-h-screen bg-slate-50'>
        <div className='min-h-screen bg-slate-50'>
          <DashboardHeader />
        </div>
      </div>
    </DashboardProvider>
  );
}
