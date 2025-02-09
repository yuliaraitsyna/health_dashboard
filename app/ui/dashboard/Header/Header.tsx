"use client"

import styles from './Header.module.css';

import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  }

  return (
    <header className={styles.header}>
        <div className={styles.logo} onClick={() => router.push('/dashboard')}>
          <MonitorHeartIcon />
          <Typography variant='h6'>Health monitoring</Typography>
        </div>
        <Button variant='contained' onClick={handleSignOut}>Sign out</Button>
    </header>
  )
}
