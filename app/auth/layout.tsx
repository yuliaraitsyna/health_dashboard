'use client';

import styles from './AuthPage.module.css';

import React, { useEffect } from 'react'
import { Button, ButtonGroup, Container } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthPage({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const router = useRouter();
    
    useEffect(() => {
        if(pathname === '/auth') {
            router.push('/auth/login');
        }
    }, [pathname, router]);

  return (
    <Container className={styles.container}>
        <ButtonGroup>
            <Button 
                onClick={() => router.push('/auth/login')} 
                variant={pathname === '/auth/login' ? 'contained' : 'outlined'}
            >
                Login
            </Button>
            <Button 
                onClick={() => router.push('/auth/register')}
                variant={pathname === '/auth/register' ? 'contained' : 'outlined'}
            >
                Register
            </Button>
        </ButtonGroup>
        <Container className={styles.form}>
            {children}
        </Container>
    </Container>
  )
}
