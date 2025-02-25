"use client"

import styles from './HeartRateChart.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { DatesFilter } from '../../DatesFilter/DatesFilter';
import Loading from '@/app/ui/loading/loading';
import { HeartRateData } from '@/app/lib/definitions';
import { Typography } from '@mui/material';

Chart.register(...registerables);

export const HeartRateChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

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

    const fetchHeartRateData = async (startDate: Date | null, endDate: Date | null) => {
        if (!startDate || !endDate) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/heart_rate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ startDate: startDate.toISOString(), endDate: endDate.toISOString() })
            });

            const result = await response.json();

            if (Array.isArray(result.heartData)) {
                setData(result.heartData);
            } else {
                console.error("Unexpected data format:", result);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHeartRateData(startDate, endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (!data.length) return;

        const sortedData = [...data].reverse();

        const labels = sortedData.map(record => new Date(record.date).toDateString());
        const values = sortedData.map(record => record.hr);

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
                        position: 'bottom',
                        align: 'center',
                    }
                }
            }
        }

        chartInstanceRef.current = new Chart(chartRef.current, config);
    }, [data]);

    if (isLoading) {
        return <Loading />
    }

    if(!data.length) return <Typography>Nothing was found</Typography>

    return (
        <>
            <DatesFilter startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} />
            <canvas ref={chartRef} className={styles.chart} />
        </>
    );
}