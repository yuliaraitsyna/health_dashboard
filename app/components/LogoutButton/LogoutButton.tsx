"use client";

import React from 'react'
import { logoutAction } from '@/app/actions/auth'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction()
        .then(() => {
            router.push('/');
        })
        .catch((error) => {
            alert(error);
        });
    }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}
