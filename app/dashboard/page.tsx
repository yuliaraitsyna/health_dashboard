import React from 'react'
import { fetchUserHeartRateRecords, fetchUsers } from '../lib/database';

export default async function Page() {
    const [users, records] = await Promise.all([
        fetchUsers(),
        fetchUserHeartRateRecords(1)
    ])

    console.log(users, records)
  return (
    <div>page</div>
  )
}
