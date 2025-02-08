import { Typography } from '@mui/material';
import ThemeWrapper from '../theme/ThemeWrapper';
import DashboardSkeleton from '../ui/dashboard/DashboardSkeleton/DashboardSkeleton';
import React from 'react'

export default async function Page() {
  return (
    <ThemeWrapper>
      <Typography variant="h3" ml={'20px'}>Dashboard</Typography>
      <DashboardSkeleton />
    </ThemeWrapper>
  )
}
