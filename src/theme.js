import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  direction:'rtl',
  palette:{
    primary: {
      main:'#1D24CA'
    },
    secondary:{
      main:'#0F67B1'
    }
  },
  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },
});

export default theme;
