"use client"

import styles from './HRVWidget.module.css';

import React, { useEffect, useState } from 'react';
import Loading from '../../loading/loading';
import { HRVPayload } from './HRVWidget.types';
import { Typography } from '@mui/material';

export default function HRVWidget() {
  const [hrvData, setHrvData] = useState<HRVPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHRVData = async () => {
      try {
        const response = await fetch('/api/heart_rate/variability');
        
        if (!response.ok) {
          throw new Error('Failed to fetch HRV data');
        }

        const data = await response.json();
        setHrvData(data);
      } catch (error) {
        if(error instanceof Error)
          setError(error.message);
        else setError("Something went wrong");
      }
    };

    fetchHRVData();
  }, []);

  if(!hrvData) return <Loading/>;

  return (
    <div className={styles.widget}>
      <Typography variant='h5'>
        Your HRV stats
      </Typography>
      <Typography variant='h6'>
        SDNN:
        <span className={styles.number}>{hrvData.hrv.sdnn.toFixed(2)}</span>
      </Typography>
      <Typography variant='h6'>
        RMSSD:
        <span className={styles.number}>{hrvData.hrv.rmssd.toFixed(2)}</span>
      </Typography>
    </div>
    
  );
}
