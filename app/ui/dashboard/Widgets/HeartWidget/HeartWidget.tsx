import React from 'react'

import styles from './HeartWidget.module.css';

import FavoriteIcon from '@mui/icons-material/Favorite';
import clsx from 'clsx';
import { WidgetProps } from '../Widgets.types';
import { Typography } from '@mui/material';
import Link from 'next/link';

const HeartWidget: React.FC<WidgetProps> = ({className}) => {
  return (
    <div className={clsx(styles.heartWidget, className)}>
        <FavoriteIcon />
        <Typography>
          Manage your heart rate and other statistic. The application provides charts for you heart 
          rate to easily understand your condition and get recommendations.
        </Typography>
        <Link href='/heart_rate'>Find out more</Link>
    </div>
  )
}

export {HeartWidget};
