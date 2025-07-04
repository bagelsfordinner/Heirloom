'use client';

import { Container, Title, Text } from '@mantine/core';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function HomePage() {
  return (
    <Container py="xl">
      <Title order={1}>🎲 TTRPG Campaign Manager</Title>
      <Text c="dimmed" mt="sm">A full-featured DM toolset for managing immersive campaigns.</Text>
      <ThemeToggle />
    </Container>
  );
}
