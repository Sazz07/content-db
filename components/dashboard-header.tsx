'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { LogOut, BarChart3 } from 'lucide-react';

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className='bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95'>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-blue-600 rounded-xl'>
                <BarChart3 className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-slate-900'>Dashboard</h1>
                <p className='text-sm text-slate-600'>
                  Content Management System
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='hidden sm:flex items-center space-x-3 px-4 py-2 bg-slate-50 rounded-xl'>
              <Avatar className='h-8 w-8'>
                <AvatarFallback className='bg-blue-600 text-white text-sm'>
                  {user?.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='text-sm'>
                <p className='font-medium text-slate-900'>{user?.name}</p>
                <p className='text-slate-600 capitalize'>{user?.role}</p>
              </div>
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={logout}
              className='border-slate-200 hover:bg-slate-50 bg-transparent'
            >
              <LogOut className='h-4 w-4 mr-2' />
              <span className='hidden sm:inline'>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
