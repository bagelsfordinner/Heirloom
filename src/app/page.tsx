'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useToastStore } from '@/lib/toast';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            addToast('error', 'Failed to set session');
          } else {
            addToast('success', 'Welcome back!');
            router.replace('/dashboard');
          }
        });
    }
  }, [searchParams, router, addToast]);

  return null; // Or landing component if needed
}
