'use client';

import { useAuth } from '@/contexts/auth-context';
import { LoginPage } from '@/components/login-page';
import { Dashboard } from '@/components/dashboard';

export default function Home() {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
}
