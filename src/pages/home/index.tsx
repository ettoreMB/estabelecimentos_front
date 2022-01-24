import { Box, Grid, Icon, Paper, Typography, Button } from '@mui/material';
import * as React from 'react';

import { PageLayout } from '../../components/PageLayout';
import { withSSRAuth } from '../../utils/withSSRAuth';


import SearchIcon from '@mui/icons-material/Search';
export default function Home() {

  return (
     <PageLayout>
       <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    backgroundColor: 'secondary'
                  }}
                >
                  <Button 
                  variant="contained"
                  sx={{
                    background: "colors.background",
                    height: 400,
                    fontSize: "1rem"
                  }}
                  startIcon={<SearchIcon/>}>
                    Pesquisar CNPJ
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    height: 240,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'secondary.main'
                  }}
                >
                  <SearchIcon sx={{fontSize: 100}}/>
                  <Typography
                    fontSize={'1.5rem'}
                  >
                    Lista De Estabelecimentos
                  </Typography>
                </Paper>
              </Grid>

            </Grid>
     </PageLayout>
            
  );
}

export const getServerSideProps = withSSRAuth(async(context) => {
  return {props: {}}
})