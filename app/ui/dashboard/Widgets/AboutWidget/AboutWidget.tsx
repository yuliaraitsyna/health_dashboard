import React from 'react'

import styles from './AboutWidget.module.css';

import clsx from 'clsx';
import { WidgetProps } from '../Widgets.types';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

const AboutWidget: React.FC<WidgetProps> = ({className}) => {
  return (
    <div className={clsx(styles.aboutWidget, className)}>
        <Typography variant='h5'>About</Typography>
        <div className={styles.links}>
            <Button variant='outlined'>
                <Link href={'https://nextjs.org/'}>Next.js</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://next-auth.js.org/'}>NextAuth.js</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://www.typescriptlang.org/'}>TypeScript</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://react.dev/'}>React.js</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://developers.google.com/people?hl=ru'}>Google Auth</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://mui.com/core/'}>MaterialUI</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://www.chartjs.org/'}>Chart.js</Link>
            </Button>
            <Button variant='outlined'>
                <Link href={'https://neon.tech/'}>Neon Postgre</Link>
            </Button>
        </div>
    </div>
  )
}

export {AboutWidget};