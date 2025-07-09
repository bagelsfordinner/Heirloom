'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type UseUserResult = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
};

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError('Failed to retrieve session');
        setLoading(false);
        return;
      }

      setSession(sessionData.session);

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        setError('Not authenticated');
        setUser(null);
      } else {
        setUser(userData.user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  return { user, session, loading, error };
}
