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

export default function LoginPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    let email = data.email_or_username;
    const password = data.password;

    // Check if user entered a username
    if (!email.includes('@')) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', email)
        .single();

      if (error || !profile?.id) {
        return alert('Username not found');
      }

      // Get email from auth.users
      const { data: userInfo, error: userError } = await supabase
        .from('users_extended')
        .select('email')
        .eq('id', profile.id)
        .single();

      if (userError || !userInfo?.email) {
        return alert('Unable to resolve email for this username');
      }

      email = userInfo.email;
    }

    // Log in with email
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) return alert(loginError.message);

    router.push('/dashboard');
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">Log in</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Email or Username"
            {...register('email_or_username')}
            required
          />
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
          <Button type="submit" fullWidth>Log In</Button>
          <Box ta="center">
            <Anchor href="/auth/signup" size="sm">
              Don&apos;t have an account? Sign up
            </Anchor>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
