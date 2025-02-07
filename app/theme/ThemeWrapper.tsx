"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/Theme";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
