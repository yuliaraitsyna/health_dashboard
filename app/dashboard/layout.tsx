import React from 'react'
import Header from '../ui/dashboard/Header/Header'
import AsideMenu from '../ui/dashboard/AsideMenu/AsideMenu'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <>
        <Header />
        <AsideMenu />
        {children}
    </>
  )
}
