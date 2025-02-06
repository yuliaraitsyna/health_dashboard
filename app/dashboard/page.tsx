import React, { Suspense } from 'react'
import { fetchUserHeartRateRecords, fetchUsers } from '../lib/database';
import Loading from './loading';
import DashboardSkeleton from '../ui/dashboard/DashboardSkeleton/DashboardSkeleton';

export default async function Page() {
    const [users, records] = await Promise.all([
        fetchUsers(),
        fetchUserHeartRateRecords(1)
    ])

    console.log(users, records)
  return (
    <Suspense fallback={<Loading />}>
        <DashboardSkeleton />
    </Suspense>
  )
}
