import React from 'react';

import AppRoutes from './routes/AppRoutes';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <AppRoutes />
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
