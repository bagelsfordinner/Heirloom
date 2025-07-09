'use client';

import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  ActionIcon,
  Stack,
} from '@mantine/core';
import { Copy, Users, User } from 'lucide-react';

export function CampaignCard({
  cover,
  name,
  description,
  system,
  gm,
  players,
  code,
}: {
  cover: string;
  name: string;
  description: string;
  system: string;
  gm: string;
  players: string[];
  code: string;
}) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder style={{ width: 320 }}>
      {cover && (
        <Card.Section>
          <Image src={cover} height={140} alt={`${name} cover`} />
        </Card.Section>
      )}
      <Stack gap="xs" mt="sm">
        <Group justify="space-between">
          <Text fw={500}>{name}</Text>
          <Badge>{system}</Badge>
        </Group>
        <Text size="sm" lineClamp={2}>{description}</Text>
      </Stack>
      <Group mt="md" justify="space-between" align="center">
        <Group gap="xs">
          <User size={16} />
          <Text color="grape" size="sm">{gm}</Text>
        </Group>
        <Group gap="xs">
          <Users size={16} />
          <Text color="blue" size="sm">{players.length} joined</Text>
        </Group>
        <ActionIcon onClick={() => navigator.clipboard.writeText(code)} title="Copy join code">
          <Copy size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
