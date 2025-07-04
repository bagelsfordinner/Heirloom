'use client';

import { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { CacheProvider } from '@emotion/react';
import { emotionCache } from '@/lib/emotion';
import { theme } from '@/lib/themes';

export function RootStyleProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CacheProvider value={emotionCache}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
