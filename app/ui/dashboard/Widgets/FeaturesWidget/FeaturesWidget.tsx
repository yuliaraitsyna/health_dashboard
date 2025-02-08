import React from 'react'

import styles from './FeaturesWidget.module.css';

import clsx from 'clsx';
import { WidgetProps } from '../Widgets.types';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@mui/material';

const FeaturesWidget: React.FC<WidgetProps> = ({className}) => {
  return (
    <div className={clsx(styles.featuresWidget, className)}>
        <div className={styles.feature}>
            <Image src='/hr.png' alt='heart rate' width={100} height={100} />
            <Typography variant='caption'>
                Monitor your heart rate and get recommendations
            </Typography>
            <Link href={'/dashboard/heart_rate'}>Find out more</Link>
        </div>
        <div className={styles.feature}>
            <Image src='/stress.png' alt='stress' width={100} height={100} />
            <Typography variant='caption'>
                Manage you stress conditions and follow recommendations
            </Typography>
            <Link href={'/dashboard/stress'}>Find out more</Link>
        </div>
        <div className={styles.feature}>
            <Image src='/stamina.png' alt='stamina' width={100} height={100} />
            <Typography variant='caption'>
                Discover your stamina and physical state
            </Typography>
            <Link href={'/dashboard/heart_rate'}>Find out more</Link>
        </div>
    </div>
  )
}

export {FeaturesWidget};