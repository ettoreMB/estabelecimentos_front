import type { AppProps } from 'next/app'

import { ThemeProvider} from '@mui/material/styles'
import { theme } from '../styles/theme'
import { CssBaseline } from '@mui/material'
import { SidebarDrawerProvider } from '../contexts/SideBarContext'

import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from '../contexts/AuthContext'
import { SnackbarProvider } from 'notistack';


function MyApp({ Component, pageProps }: AppProps) {
  return (
   
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <AuthProvider>
              <SnackbarProvider maxSnack={3}>
                <SidebarDrawerProvider>
                  <Component {...pageProps} />
                </SidebarDrawerProvider>
              </SnackbarProvider>
            </AuthProvider>
          </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
 
  )
}

export default MyApp
