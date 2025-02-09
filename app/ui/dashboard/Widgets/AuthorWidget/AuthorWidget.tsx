import React from 'react'

import styles from './AuthorWidget.module.css';

import clsx from 'clsx';
import { WidgetProps } from '../Widgets.types';
import { Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

const AuthorWidget: React.FC<WidgetProps> = ({className}) => {
  return (
    <div className={clsx(styles.authorWidget, className)}>
        <Typography variant='h6'>Author</Typography>
        <Typography variant='body1'>
            This application was made by 
        </Typography>
        <span>Yuliya Raitsyna</span>
        <Link href='https://github.com/yuliaraitsyna' className={styles.link}>
          <GitHubIcon className={styles.icon}/>
        </Link>
    </div>
  )
}

export {AuthorWidget};
