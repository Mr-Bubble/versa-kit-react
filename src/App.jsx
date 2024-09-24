import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import TabBar from '@/components/TabBar/TabBar'

function App() {
  return (
    <BrowserRouter basename="/versa-kit-react">
      <CssBaseline />
      <Routing />
      <TabBar/>
    </BrowserRouter>
  );
}

export default App;
