import React from 'react'

import styles from './InfoWidget.module.css';

import clsx from 'clsx';
import { WidgetProps } from '../Widgets.types';
import { Typography } from '@mui/material';

const InfoWidget: React.FC<WidgetProps> = ({className}) => {
  return (
    <div className={clsx(styles.infoWidget, className)}>
        <Typography variant='h4'>Why use Health monitoring?</Typography>
        <Typography>
        In today’s fast-paced world, maintaining a healthy lifestyle can be challenging. Our health application
        is designed to help you take control of your well-being by providing personalized insights, activity 
        tracking, and wellness guidance—all in one place.
        </Typography>
    </div>
  )
}

export {InfoWidget};
