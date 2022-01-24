import { Box, Grid, Icon, Paper, Typography, Button } from '@mui/material';
import * as React from 'react';
import Link from 'next/link'
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
                  <Link href={'/search'}>
                    <Button 
                    variant="contained"
                    sx={{
                      background: "colors.background",
                      height: 400,
                      fontSize: "2rem"
                    }}
                    >
                      Pesquisar CNPJ
                    </Button>
                  </Link>
                </Paper>
              </Grid>
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
                  <Link href={'/table'}>
                    <Button 
                    variant="contained"
                    sx={{
                      background: "colors.background",
                      height: 400,
                      fontSize: "2rem"
                    }}
                    >
                      Lista CNPJ
                    </Button>
                  </Link>
                </Paper>
              </Grid>

            </Grid>
     </PageLayout>
            
  );
}

export const getServerSideProps = withSSRAuth(async(context) => {
  return {props: {}}
})