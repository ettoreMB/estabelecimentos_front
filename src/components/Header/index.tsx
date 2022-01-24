import { Box, AppBar, Toolbar, IconButton, Typography, Button, Drawer} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useSidebarDrawer } from '../../contexts/SideBarContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

type IHeader = {
  user?: {
    email: string;
    username: string;
  };
}

export default function Header({}) {
  const { user } =  useContext(AuthContext)
  const { isOpen, handleDrawer } = useSidebarDrawer()
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar position='absolute' sx={{}}>
          <Toolbar  sx={{height: '20px'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {handleDrawer()}}
            >
              <MenuIcon />

            </IconButton>
            <Typography
              variant="h6"
              component="div" 
              sx={{ flexGrow: 1 }}
            >
              Menu
            </Typography>
            <Button color="inherit" >{user?.username}</Button>  
          </Toolbar>
        </AppBar> 
      </Box>
    </>
  )
}


