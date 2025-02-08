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
        outlined: {
          backgroundColor: 'transparent',
          borderColor: "#000",
          color: "#000",
          "&:hover": {
            borderColor: "#c1121f",
            backgroundColor: "#c1121f30",
            color: "#c1121f",
          },
        },
      },
    },
  },
});

export default theme;
