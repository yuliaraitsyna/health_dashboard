import styles from './Header.module.css';

import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Typography } from '@mui/material';

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          <MonitorHeartIcon />
          <Typography>Health monitoring</Typography>
        </div>
    </header>
  )
}
