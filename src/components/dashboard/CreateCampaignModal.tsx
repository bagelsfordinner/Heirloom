'use client';

import {
  Modal,
  Button,
  Group,
  TextInput,
  Textarea,
  Select,
  SegmentedControl,
  FileInput,
  Stack,
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';

type CampaignFormData = {
  name: string;
  description: string;
  system: string;
  role: string;
  cover: File | null;
};

type CreateCampaignModalProps = {
  opened: boolean;
  onClose: () => void;
  onCreate: (data: CampaignFormData) => void;
};

export function CreateCampaignModal({
  opened,
  onClose,
  onCreate,
}: CreateCampaignModalProps) {
  const { control, handleSubmit, reset } = useForm<CampaignFormData>({
    defaultValues: {
      name: '',
      description: '',
      system: '',
      role: 'GM',
      cover: null,
    },
  });

  useEffect(() => {
    if (opened) {
      reset(); // Clear form when modal opens
    }
  }, [opened, reset]);

  const handle = (data: CampaignFormData) => {
    onCreate(data);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Campaign">
      <form onSubmit={handleSubmit(handle)}>
        <Stack gap="md">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput label="Name" required {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea label="Description" required {...field} />
            )}
          />
          <Controller
            name="cover"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <FileInput
                label="Cover image"
                value={value}
                onChange={onChange}
                ref={ref}
                accept="image/*"
              />
            )}
          />
          <Controller
            name="system"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                label="System"
                required
                data={['D&D 5e', 'Pathfinder', 'Call of Cthulhu']}
                value={value}
                onChange={onChange}
                name={name}
                ref={ref}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <SegmentedControl
                data={['GM', 'Player']}
                value={value}
                onChange={onChange}
                name={name}
                ref={ref}
              />
            )}
          />

          <Group justify="space-between" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
