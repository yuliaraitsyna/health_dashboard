'use client'

import styles from '../Form.module.css';

import React from 'react'
import { RegisterFormInputs } from './RegisterForm.types';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { registerAction } from '@/app/actions/auth';

export default function RegisterForm() {
    const router = useRouter();

    const {
        register,
        watch,
        formState: { errors }
    } = useForm<RegisterFormInputs>();

    const handleSubmit = async (formData: FormData) => {
        const result = await registerAction(formData);
    
        if (result?.error) {
            alert(result.error); // Or handle error state in UI
        } else {
            console.log(result.success);
            router.push("/dashboard"); // Redirect after successful registration
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

