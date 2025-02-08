import styles from '../Widget.module.css';

import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { AuthWidgetProps } from '../AuthWidgetProps.types';
import { useRouter } from 'next/navigation';

const SignOutWidget: React.FC<AuthWidgetProps> = ({username, onClick}) => {
    const router = useRouter();

  return (
    <Container className={styles.widget}>
      <Typography variant='h3'>Health monitoring app</Typography>
      <Typography variant='body1'>Welcome, {`${username}`} </Typography>
      <Container className={styles.controls}>
        <Button variant='contained' onClick={() => router.push('/dashboard')}>Go to dashboard</Button>
        <Button onClick={onClick} variant='contained'>Sign out</Button>
      </Container>
    </Container>
  )
}

export {SignOutWidget}
