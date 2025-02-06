import React from 'react'
import Header from '../ui/dashboard/Header/Header'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <>
        <Header />
        {children}
    </>
  )
}
