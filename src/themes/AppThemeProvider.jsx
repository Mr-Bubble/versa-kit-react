import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { useSelector } from 'react-redux';
import { selectMode } from '@/features/user/userSlice';
import { extendTheme } from '@mui/joy/styles';

function AppThemeProvider({ children }) {
  const mode = useSelector(selectMode);
  const theme = extendTheme({
    palette: {
      mode,
    },
  });

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}

export default AppThemeProvider;
