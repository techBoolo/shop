import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = (props) => {
  const [ openDrawer, setOpenDrawer ] = useState(false)

  const { currentUser } = useSelector(state => state.user);

  const handleLogout = () => {

  }
  const menuList = () => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={() => setOpenDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon><ChevronRightIcon /></ListItemIcon>
          <ListItemText primary='' />
        </ListItem>
        { !currentUser && 
          <Link component={RouterLink} to='/users/signup' sx={{ textDecoration: 'none', color: '#171717' }}>
            <ListItem button>
              <ListItemIcon><AddCircleIcon /></ListItemIcon>
              <ListItemText primary='Signup' />
            </ListItem>
          </Link>
        }
        <Link component={RouterLink} to='/contact' sx={{ textDecoration: 'none', color: '#171717' }}>
          <ListItem button>
            <ListItemIcon><ContactPageIcon /></ListItemIcon>
            <ListItemText primary='Contact us' />
          </ListItem>
        </Link>
        <Link component={RouterLink} to='/about' sx={{ textDecoration: 'none', color: '#171717' }}>
          <ListItem button>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary='About us' />
          </ListItem>
        </Link>
        { currentUser && 
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        }
      </List>
    </Box>
  )

  return (
    <Box>
      <AppBar position='static' sx={{ mb: 2}}>
        <Toolbar sx={{ height: '64px' }}>
          <Link component={RouterLink} to='/' sx={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography component='h2' variant='h6' sx={{ color: '#f4f4f4'}}>Shop</Typography>
          </Link>

          { currentUser
            ? (<Link component={RouterLink} to={`/users/${currentUser.id}`}>
                <Avatar alt={currentUser?.name} src='' sx={{ width: 30, height: 30 }} />
              </Link>)

            : (<Link component={RouterLink} to='/users/signin' sx={{ textDecoration: 'none' }}>
                <Typography component='h2' variant='body1' sx={{ color: '#f4f4f4', mr: 2}}>Signin</Typography>
              </Link>)
          }

          <IconButton onClick={() => setOpenDrawer(true)} sx={{  color: '#f4f4f4', ml: 2}} >
            <MenuOpenIcon fontSize='large' />
          </IconButton>
          <Drawer
            anchor='right'
            open={openDrawer}
            onClose={() => setOpenDrawer(!openDrawer) }
          >
            { menuList() }
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
