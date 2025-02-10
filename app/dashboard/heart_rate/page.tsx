"use client"

import { HeartRateChart } from '@/app/ui/heartRate/Charts/HeartRateChart/HeartRateChart';
import styles from './page.module.css';

import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '@/app/ui/loading/loading';
import { HeartRateData } from '@/app/lib/definitions';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<HeartRateData[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("/api/heart_rate");
          const result = await response.json();
  
          if (Array.isArray(result.heartData)) {
              setData(result.heartData);
              setIsLoading(false);
          } else if (Array.isArray(result)) {
              setData(result);
              setIsLoading(false);
          } else {
              console.error("Unexpected data format:", result);
          }
  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      fetchData();
    }, []);

  if(isLoading) {
    return <Loading />
  }
    
  return (
    <Container className={styles.container}>
        <HeartRateChart data={data} />
    </Container>
  )
}
