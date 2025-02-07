import { Typography } from '@mui/material';
import { fetchUserHeartRateRecords, fetchUsers } from '../lib/database';
import ThemeWrapper from '../theme/ThemeWrapper';
import DashboardSkeleton from '../ui/dashboard/DashboardSkeleton/DashboardSkeleton';

export default async function Page() {
    const [users, records] = await Promise.all([
        fetchUsers(),
        fetchUserHeartRateRecords(1)
    ])

    console.log(users, records)
  return (
    <ThemeWrapper>
      <Typography variant="h3" ml={'20px'}>Dashboard</Typography>
      <DashboardSkeleton />
    </ThemeWrapper>
  )
}
