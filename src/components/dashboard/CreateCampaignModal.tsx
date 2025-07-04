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
  const { control, handleSubmit } = useForm({
    defaultValues: { name: '', description: '', system: '', role: 'GM', cover: null },
  });

  const handle = (data: CampaignFormData) => {
    onCreate(data);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Campaign">
      <form onSubmit={handleSubmit(handle)}>
        <Stack gap="md">
          <Controller name="name" control={control} render={({ field }) =>
            <TextInput label="Name" required {...field} />}
          />
          <Controller name="description" control={control} render={({ field }) =>
            <Textarea label="Description" required {...field} />}
          />
          <Controller name="cover" control={control} render={({ field }) =>
            <FileInput label="Cover image" {...field} />}
          />
          <Controller name="system" control={control} render={({ field }) =>
            <Select required data={['D&D 5e','Pathfinder','CoC']} label="System" {...field} />}
          />
          <Controller name="role" control={control} render={({ field }) =>
            <SegmentedControl data={['GM','Player']} {...field} />}
          />
          <Group justify="space-between" mt="md">
            <Button variant="default" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
