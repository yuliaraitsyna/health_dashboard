"use client"

import styles from './Layout.module.css'

import React from 'react'
import Header from '../ui/dashboard/Header/Header'
import AsideMenu from '../ui/dashboard/AsideMenu/AsideMenu'
import { Container } from '@mui/material'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <>
        <Header />
        <AsideMenu />
        <Container className={styles.container}>
            {children}
        </Container>
    </>
  )
}
