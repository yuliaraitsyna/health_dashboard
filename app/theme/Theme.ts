import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#c1121f",
          },
        },
      },
    },
  },
});

export default theme;