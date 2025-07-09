// src/components/auth/RequireAuth.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { Loader } from '@mantine/core';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      if (!session) {
        router.replace(`/auth/login?redirect_to=${encodeURIComponent(path)}`);
      }
    });

    // Subscribe to auth changes
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        router.replace(`/auth/login?redirect_to=${encodeURIComponent(path)}`);
      }
    });

    // Cleanup listener
    return () => data.subscription.unsubscribe();
  }, [path, router]);

  // Show loader while checking auth
  if (loading || !session) {
    return (
      <Loader
        size="lg"
        style={{ display: 'block', margin: 'auto', marginTop: '20vh' }}
      />
    );
  }

  return <>{children}</>;
}
