// src/theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue for primary elements
    },
    secondary: {
      main: '#f48fb1', // Pink for secondary elements
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1d1d1d', // Slightly lighter for cards/components
    },
    text: {
      primary: '#ffffff', // White text for readability
      secondary: '#b0bec5', // Lighter gray for secondary text
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1d1d1d', // Dark cards
        },
      },
    },
  },
});

export default darkTheme;