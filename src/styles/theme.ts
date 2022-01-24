import { createStyles, makeStyles } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors'
import type { } from '@mui/lab/themeAugmentation';
import '@mui/lab/themeAugmentation';

import { fontSize } from '@mui/system';

const colors = {
  primary: {
    main: "#1d2737",
    50: "#758fa3",
    100: "#668399",
    200: "#5c768a",
    300: "#52697a",
    400: "#475c6b",
    500: "#475c6b"
  },
  secondary: {
    50: "##859bad",
    100: "#758fa3",
    200: "#758fa3",
    300: "#5c768a",
    400: "#52697a",
    500: "#475c6b"
  },
  success: "#d6fff1",
  danger: "#ffdbd6",
  warning: "#fffdd6",
  background: "#e8eae3",
  background_light: "#f5f5f5",
  background_dark: "#536a7d",
  text_dark: "#3a4a57",
  text: "#1d2737",
  text_menu: "#e8eae3"

}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      100: colors.primary[500]
    },
    text: {
      primary: colors.text
    },
    background: {
      paper: colors.background_light,
      default: colors.background
    },

  },
  typography: {
    fontWeightBold: 'bold',
    fontSize: 16
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 28
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          fontSize: 12,
        }
      }

    },
    MuiTab: {
      styleOverrides: {
        labelIcon: {
          fontSize: '30px'
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        root: {

        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: 'white'
        }
      }
    },

  },
}
);

export { theme }

