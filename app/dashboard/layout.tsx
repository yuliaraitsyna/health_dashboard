"use client"

import styles from './Layout.module.css'

import React from 'react'
import Header from '../ui/dashboard/Header/Header'
import AsideMenu from '../ui/dashboard/AsideMenu/AsideMenu'
import ThemeWrapper from '../theme/ThemeWrapper'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <>
        <ThemeWrapper>
          <Header />
          <AsideMenu />
          <div className={styles.container}>
              {children}
          </div>
        </ThemeWrapper>
    </>
  )
}
