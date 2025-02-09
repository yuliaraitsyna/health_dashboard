"use client";

import styles from './page.module.css';

import { signIn, signOut, useSession } from "next-auth/react";
import {SignInWidget} from "./components/AuthWidgets/SignInWidget/SignInWidget";
import { SignOutWidget } from "./components/AuthWidgets/SignOutWidget/SignOutWidget";
import { Container } from "@mui/material";
import ThemeWrapper from './theme/ThemeWrapper';
import Loading from './ui/loading/loading';


export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <ThemeWrapper>
      <Container className={styles.container}>
        {
          session 
          ? 
          <SignOutWidget onClick={() => signOut()} username={session.user?.email} />
          :
          <SignInWidget onClick={() => signIn('google')}/>
        }
      </Container>
    </ThemeWrapper>
  )
}
