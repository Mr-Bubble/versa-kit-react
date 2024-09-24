import React from 'react';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMode } from '@/features/user/userSlice';

function AppThemeProvider({ children }) {
  const mode = useSelector(selectMode);
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode,
      },

      typography: {

      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              // ---CSS BODY--- \\
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {

            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {

            },
          },
        },
      },
    }),
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
