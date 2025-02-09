import styles from './Loading.module.css';

import React from 'react'
import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  )
}
