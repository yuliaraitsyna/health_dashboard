'use client'

import styles from '../Form.module.css';

import React, { FormEvent } from 'react'
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

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    }

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

