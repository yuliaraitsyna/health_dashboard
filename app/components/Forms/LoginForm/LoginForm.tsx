'use client'

import styles from '../Form.module.css';

import React from 'react'
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm.types';

export default function LoginForm() {
  const {
    register,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  return (
    <form className={styles.form}>
      <TextField
        {...register('username', { required: 'Username is required' })}
        label="Username"
        type="text"
        fullWidth
        error={!!errors.username}
        helperText={errors.username?.message}
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
