import HeartRateChart from '@/app/ui/heartRate/HeartRateChart/HeartRateChart';
import styles from './page.module.css';

import { Container } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Container className={styles.container}>
        <HeartRateChart />
    </Container>
  )
}
