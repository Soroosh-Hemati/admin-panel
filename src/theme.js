import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  direction:'rtl',
  palette:{
    primary: {
      main:'#1D24CA'
    }
  },
  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },
});

export default theme;
