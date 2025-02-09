import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3943b7",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#4653de",
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: "#3943b7",
          color: "#3943b7",
          "&:hover": {
            borderColor: "#3943b7",
            backgroundColor: "#3943b720",
            color: "#c1121f",
          },
        },
      },
    },
  },
});

export default theme;
