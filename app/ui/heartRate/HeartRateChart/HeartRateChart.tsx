"use client"

import styles from './HeartRateChart.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { HeartRateData } from '@/app/lib/definitions';

Chart.register(...registerables);

export default function HeartRateChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [data, setData] = useState<HeartRateData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/heart_rate");
        const result = await response.json();

        if (Array.isArray(result.heartData)) {
            setData(result.heartData);
        } else if (Array.isArray(result)) {
            setData(result);
        } else {
            console.error("Unexpected data format:", result);
        }

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

    if(!data.length) return;

    const labels = data.map(record => new Date(record.date).toDateString());
    const values = data.map(record => record.hr);

    console.log(values)

    const config: ChartConfiguration = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Heart rate",
                    data: values,
                    backgroundColor: "#555"
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Heart data",
                }
            }
        }
    }

    chartInstanceRef.current = new Chart(chartRef.current, config);
  }, [data])

  return <canvas ref={chartRef} className={styles.chart} />
}
