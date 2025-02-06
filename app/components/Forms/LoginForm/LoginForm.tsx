'use client'

import styles from '../Form.module.css';

import React from 'react'
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm.types';
import { loginAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const handleSubmit = async (formData: FormData) => {
    const result = await loginAction(formData);

    if (result?.error) {
        alert(result.error);
    } else {
        console.log(result.success);
        router.push("/dashboard");
    }
  };


  return (
    <form className={styles.form} action={handleSubmit}>
      <TextField
        {...register('email', { required: 'Email is required' })}
        label="Email"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        required
      />
      <TextField
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 5, message: 'Password must be at least 5 characters' },
        })}
        label="Password"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        required
      />
      <Button type='submit' variant='contained'>Login</Button>
    </form>
  )
}
