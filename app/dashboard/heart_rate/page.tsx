"use client"

import { HeartRateChart } from '@/app/ui/heartRate/Charts/HeartRateChart/HeartRateChart';
import styles from './page.module.css';

import { Container } from '@mui/material'
import React from 'react'
import HRVWidget from '@/app/ui/heartRate/HRVWidget/HRVWidget';

export default function Page() {
  return (
    <Container className={styles.container}>
        <HeartRateChart />
        <HRVWidget />
    </Container>
  )
}
