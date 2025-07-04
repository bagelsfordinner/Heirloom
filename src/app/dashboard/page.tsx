'use client';
import { AppShell, Button, Group, Container, SimpleGrid, AppShellMain } from '@mantine/core';
import { CampaignCard } from '@/components/dashboard/CampaignCard';
import { CreateCampaignModal } from '@/components/dashboard/CreateCampaignModal';
import { useState } from 'react';

export default function DashboardPage() {
  const [modal, setModal] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const handleCreate = (data: any) => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setCampaigns(c => [...c, { ...data, cover: '', code, gm: 'You', players: [] }]);
  };

  return (
    <>
      <AppShell padding="md">
        <AppShell.Header withBorder h={60} px="md">
          <Group justify="space-between" h="100%">
            <Group gap="md">
              <Button variant="subtle">Marketplace</Button>
              <Button variant="subtle">Browse</Button>
            </Group>
            <Button variant="outline">Account</Button>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Container my="md">
            <Group mb="md">
              <Button onClick={() => setModal(true)}>Create Campaign</Button>
              <Button>Join Campaign</Button>
            </Group>
            <SimpleGrid cols={3} spacing="md">
              {campaigns.map((c, idx) => <CampaignCard key={idx} {...c} />)}
            </SimpleGrid>
          </Container>
        </AppShell.Main>
      </AppShell>

      <CreateCampaignModal
        opened={modal}
        onClose={() => setModal(false)}
        onCreate={handleCreate}
      />
    </>
  );
}
