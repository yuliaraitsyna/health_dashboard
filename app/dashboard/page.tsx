import React, { Suspense } from 'react'
import { fetchUserHeartRateRecords, fetchUsers } from '../lib/database';
import Loading from './loading';

export default async function Page() {
    const [users, records] = await Promise.all([
        fetchUsers(),
        fetchUserHeartRateRecords(1)
    ])

    console.log(users, records)
  return (
    <Suspense fallback={<Loading />}>
        <h1>Dashboard</h1>
    </Suspense>
  )
}
