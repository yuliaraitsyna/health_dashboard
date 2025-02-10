"use client"

import styles from './HeartRateChart.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { Chart, } from 'chart.js'
import { HeartRateData } from '@/app/lib/definitions';

export default function HeartRateChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [data, setData] = useState<HeartRateData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/heart_rate");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if(!chartRef.current) return;

    if(chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
    }



  }, [])

  return <canvas ref={chartRef} className={styles.chart} />
}
