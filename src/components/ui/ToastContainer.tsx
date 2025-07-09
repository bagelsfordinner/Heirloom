'use client';

import { useToastStore, Toast } from '@/lib/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Text, Group, ActionIcon, useMantineTheme } from '@mantine/core';
import { X } from 'lucide-react';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);
  const theme = useMantineTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 10000,
      }}
    >
      <AnimatePresence>
        {toasts.map((toast: Toast) => {
          const bg =
            toast.type === 'error'
              ? theme.colors.red[0]
              : theme.colors.green[0];

          const border =
            toast.type === 'error'
              ? theme.colors.red[5]
              : theme.colors.green[5];

          const text =
            toast.type === 'error'
              ? theme.colors.red[7]
              : theme.colors.green[7];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.1 }}
            >
              <Card withBorder radius="md" style={{ backgroundColor: bg, borderColor: border }}>
                <Group justify="space-between">
                  <Text size="sm" style={{ color: text }}>
                    {toast.message}
                  </Text>
                  <ActionIcon onClick={() => removeToast(toast.id)} variant="subtle">
                    <X size={16} />
                  </ActionIcon>
                </Group>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
