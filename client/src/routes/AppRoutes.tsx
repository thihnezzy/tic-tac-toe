import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PageContainer from '../components/layout/PageContainer';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageContainer>
            <Home />
          </PageContainer>
        }
      />
      <Route
        path="/:roomId"
        element={
          <PageContainer>
            <Home />
          </PageContainer>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
