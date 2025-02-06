'use client'

import styles from '../Form.module.css';

import React from 'react'
import { RegisterFormInputs } from './RegisterForm.types';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export default function RegisterForm() {
    const {
        register,
        watch,
        formState: { errors }
    } = useForm<RegisterFormInputs>();

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
            <TextField
                {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === watch('password') || "Passwords don't match",
                })}
                label="Confirm Password"
                type="password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                required
            />
            <Button type='submit' variant='contained'>Register</Button>
        </form>
    )
}

