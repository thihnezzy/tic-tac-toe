import { Container } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <Container className="min-h-[100vh] min-w-[100vw] flex flex-col items-center justify-center bg-dark-200 mx-auto">
      {children}
    </Container>
  );
};

export default PageContainer;
