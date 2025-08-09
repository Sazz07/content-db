'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-context';
import { LogOut, BarChart3, Settings, User } from 'lucide-react';

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className='bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50'>
      <div className='container mx-auto px-4 sm:px-6 max-w-7xl'>
        <div className='flex items-center justify-between h-16'>
          {/* Brand Section */}
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25'>
                  <BarChart3 className='w-5 h-5 text-white' />
                </div>
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
              </div>
              <div className='hidden sm:block'>
                <h1 className='text-xl font-bold text-slate-900 tracking-tight'>
                  Dashboard
                </h1>
                <p className='text-sm text-slate-500 -mt-0.5'>
                  Content Management
                </p>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className='flex items-center'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-12 px-3 hover:bg-slate-50/80 transition-all duration-200 rounded-xl'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='flex flex-col items-end text-right min-w-0'>
                      <span className='text-sm font-semibold text-slate-900 truncate max-w-[120px] sm:max-w-none'>
                        {user?.name}
                      </span>
                      <div className='flex items-center space-x-2'>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            user?.role === 'admin'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {user?.role === 'admin' ? 'Admin' : 'Editor'}
                        </span>
                      </div>
                    </div>
                    <div className='relative'>
                      <Avatar className='h-9 w-9 ring-2 ring-slate-100'>
                        <AvatarFallback className='bg-gradient-to-br from-slate-600 to-slate-700 text-white text-sm font-semibold'>
                          {user?.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-64 p-2 shadow-xl border-slate-200/60'
              >
                <DropdownMenuLabel className='p-3 bg-slate-50/50 rounded-lg mb-2'>
                  <div className='flex items-center space-x-3'>
                    <Avatar className='h-12 w-12 ring-2 ring-white shadow-sm'>
                      <AvatarFallback className='bg-gradient-to-br from-slate-600 to-slate-700 text-white font-semibold'>
                        {user?.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-slate-900 truncate'>
                        {user?.name}
                      </p>
                      <p className='text-xs text-slate-500 truncate'>
                        {user?.email}
                      </p>
                      <div className='mt-2'>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            user?.role === 'admin'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              user?.role === 'admin'
                                ? 'bg-blue-500'
                                : 'bg-emerald-500'
                            }`}
                          ></div>
                          {user?.role === 'admin' ? 'Administrator' : 'Editor'}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='my-2' />

                <DropdownMenuSeparator className='my-2' />
                <DropdownMenuItem
                  onClick={logout}
                  className='p-3 rounded-lg cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors'
                >
                  <LogOut className='h-4 w-4 mr-3' />
                  <span className='text-sm font-medium'>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
