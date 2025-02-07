'use client'

import styles from '../Form.module.css';

import React, { FormEvent } from 'react'
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from './LoginForm.types';

export default function LoginForm() {
  const {
    register,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
