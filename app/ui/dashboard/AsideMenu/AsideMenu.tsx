"use client";

import styles from "./AsideMenu.module.css";

import React, { useState } from "react";
import clsx from "clsx";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";

export default function AsideMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const className = clsx(styles.menu, { [styles.open]: isOpen, [styles.closed]: !isOpen });

  return (
    <div className={className}>
      {isOpen ? (
        <ArrowBackIosNewIcon onClick={() => setIsOpen(false)} className={styles.button} />
      ) : (
        <ArrowForwardIosIcon onClick={() => setIsOpen(true)} className={styles.button} />
      )}
      <nav>
        <ul>
            <li>
                <Link href='/heart_rate'>Heart rate</Link>
            </li>
            <li>
                <Link href='/stress'>Stress</Link>
            </li>
            <li>
                <Link href='/stamina'>Stamina</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}
