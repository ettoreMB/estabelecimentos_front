import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import Header from './Header';
import { SideMenu } from './SideMenu';



interface ILayoutProps {
  children: ReactNode;
}

export function PageLayout({children}:ILayoutProps)   {

  return (
    <>
      <Header />
      <SideMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
          {children}
        </Container>
        
      </Box>
    </>
  )
}

