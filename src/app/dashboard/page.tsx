'use client';
import { AppShell, Button, Group, Container, SimpleGrid, AppShellMain } from '@mantine/core';
import { CampaignCard } from '@/components/dashboard/CampaignCard';
import { CreateCampaignModal } from '@/components/dashboard/CreateCampaignModal';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { supabase } from '@/lib/supabase';
import { useToastStore } from '@/lib/toast';

export default function DashboardPage() {
  const { user, loading, error } = useUser();
  const [modal, setModal] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const addToast = useToastStore((s) => s.addToast);

  const fetchCampaigns = async () => {
  const { data, error } = await supabase
    .from('campaign_members')
    .select('campaigns(*)')
    .eq('user_id', user!.id);

  if (error) {
    console.log(error);
    addToast('error', 'Failed to load campaigns');
    return;
  }

  const mapped = data
    .map((entry: any) => entry.campaigns)
    .filter((c: any) => c); // Avoid nulls if FK is broken

  setCampaigns(mapped);
};

  const handleCreate = async (formData: any) => {
  if (!user) return;

  try {
    let coverUrl = null;

    // 1. Upload cover image
    if (formData.cover) {
      const fileExt = formData.cover.name.split('.').pop();
      const fileName = `${Date.now()}_${user.id}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('campaign-covers')
        .upload(filePath, formData.cover, {
          contentType: formData.cover.type,
          upsert: true,
        });

      if (uploadError) {
        addToast('error', 'Image upload failed');
        return;
      }

      const { data } = supabase.storage
        .from('campaign-covers')
        .getPublicUrl(filePath);

      const coverUrl = data?.publicUrl ?? null;
    }

    // 2. Generate a 6-char uppercase code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 3. Insert into campaigns
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .insert({
        name: formData.name,
        description: formData.description,
        system: formData.system,
        gm_id: user.id,
        cover_url: coverUrl,
        code,
      })
      .select()
      .single();

    if (campaignError || !campaign) {
      addToast('error', 'Failed to create campaign');
      return;
    }

    // 4. Add user as GM in campaign_members
    const { error: memberError } = await supabase
      .from('campaign_members')
      .insert({
        user_id: user.id,
        campaign_id: campaign.id,
        role: formData.role.toLowerCase(), // 'gm' | 'player'
      });

    if (memberError) {
      addToast('error', 'Failed to link user to campaign');
      return;
    }

    // 5. Update local state
    setCampaigns((prev) => [...prev, campaign]);
    addToast('success', 'Campaign created!');

  } catch (e) {
    console.error(e);
    addToast('error', 'Unexpected error during campaign creation');
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <RequireAuth>
      <AppShell header={{ height: 60 }} padding="md">
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
            <Group mb="md" >
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
    </RequireAuth>
  );
}
