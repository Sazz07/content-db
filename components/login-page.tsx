'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, Shield } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/validations';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);
      if (!success) {
        setLoginError('Invalid email or password');
      }
    } catch (err) {
      setLoginError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4'>
            <Shield className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-slate-900'>Welcome back</h1>
          <p className='text-slate-600 mt-2'>Sign in to your admin dashboard</p>
        </div>

        <Card className='border-0 shadow-xl bg-white/80 backdrop-blur-sm'>
          <CardHeader className='space-y-1 pb-6'>
            <CardTitle className='text-xl font-semibold text-center'>
              Sign In
            </CardTitle>
            <CardDescription className='text-center text-slate-600'>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium text-slate-700'
                >
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='admin@example.com'
                  className='h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='text-sm text-red-600'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-sm font-medium text-slate-700'
                >
                  Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter your password'
                  className='h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='text-sm text-red-600'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {loginError && (
                <Alert
                  variant='destructive'
                  className='border-red-200 bg-red-50'
                >
                  <AlertDescription className='text-red-800'>
                    {loginError}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type='submit'
                className='w-full h-11 bg-blue-600 hover:bg-blue-700'
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Sign In
              </Button>
            </form>

            <div className='mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100'>
              <p className='text-sm font-medium text-blue-900 mb-3'>
                Demo Credentials:
              </p>
              <div className='space-y-2 text-xs'>
                <div className='flex justify-between items-center p-2 bg-white rounded-lg'>
                  <span className='font-medium text-slate-700'>Admin:</span>
                  <span className='text-slate-600'>
                    admin@example.com / admin123
                  </span>
                </div>
                <div className='flex justify-between items-center p-2 bg-white rounded-lg'>
                  <span className='font-medium text-slate-700'>Editor:</span>
                  <span className='text-slate-600'>
                    editor@example.com / editor123
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
