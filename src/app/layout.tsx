import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { RootStyleProvider } from '@/components/providers/RootStyleProvider';
import { PageShell } from '@/components/layout/PageShell';

export const metadata = {
  title: 'TTRPG Campaign Manager',
  description: 'Manage immersive tabletop RPGs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: '#1a1b1e' }} data-mantine-color-scheme="dark">
      <body style={{ minHeight: '100dvh' }}>
        <RootStyleProvider>
          <PageShell>{children}</PageShell>
        </RootStyleProvider>
      </body>
    </html>
  );
}
