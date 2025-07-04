'use client';

import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password, username } = data;

    // Sign up the user
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    // Store the username in `profiles`
    const userId = authData.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: userId, username });

      if (profileError) return alert(profileError.message);
    }

    router.push('/dashboard');
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">Sign up</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput label="Username" {...register('username')} required />
          <TextInput label="Email" type="email" {...register('email')} required />
          <PasswordInput
            label="Password"
            {...register('password')}
            required
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOff size={16} /> : <Eye size={16} />
            }
            visible={visible}
            onVisibilityChange={setVisible}
          />
          <Button type="submit" fullWidth>Sign Up</Button>
          <Box ta="center">
            <Anchor href="/auth/login" size="sm">
              Already have an account? Log in
            </Anchor>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
