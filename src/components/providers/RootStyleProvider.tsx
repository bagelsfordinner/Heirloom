'use client';

import { MantineProvider } from '@mantine/core';
import { CacheProvider } from '@emotion/react';
import { Notifications } from '@mantine/notifications';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { emotionCache } from '@/lib/emotion';
import { theme } from '@/lib/themes';

export function RootStyleProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={emotionCache}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <ToastContainer />
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
