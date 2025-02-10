"use client"

import styles from './HeartRateChart.module.css';

import React, { useEffect, useRef} from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { ChartProps } from '../ChartProps.types';

Chart.register(...registerables);

export const HeartRateChart: React.FC<ChartProps> = ({data}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if(!chartRef.current) return;

    if(chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
    }

    if(!data.length) return;

    const labels = data.map(record => new Date(record.date).toDateString());
    const values = data.map(record => record.hr);

    const config: ChartConfiguration = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Heart rate",
                    data: values,
                    backgroundColor: "#fff",
                }
            ]
        },
        options: {
            layout: {
                padding: 10,
            },
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Heart data",
                    color: '#3943b7',
                
                },
                legend: {
                    position:'bottom',
                    align: 'center',
                }
            }
        }
    }

    chartInstanceRef.current = new Chart(chartRef.current, config);
  }, [data])

  return <canvas ref={chartRef} className={styles.chart} />
}
