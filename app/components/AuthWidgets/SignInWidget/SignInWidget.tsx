import styles from '../Widget.module.css';

import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { AuthWidgetProps } from '../AuthWidgetProps.types';

const SignInWidget: React.FC<AuthWidgetProps> = ({onClick}) => {
  return (
    <Container className={styles.widget}>
      <Typography variant='h3'>Health monitoring app</Typography>
      <Typography variant='body1'>To access the app you need to sign in</Typography>
      <Button onClick={onClick} variant='contained' className={styles.button}>
        <GoogleIcon/> 
        Sign in with google
      </Button>
    </Container>
  )
}

export {SignInWidget}
