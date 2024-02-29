import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MENUS from '../pages';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open === false && {
    width: `calc(100% - calc(${theme.spacing(11)} + 1px))`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - calc(${theme.spacing(12)} + 1px))`,
    },
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "white"
}));

interface TopbarProps {
  isOpen: boolean;
  handleDrawer: Function;
}

const Topbar: React.FC<TopbarProps> = ({ isOpen, handleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    let currentRoute: any = MENUS.find((item) => item.href === location.pathname);
    setTitle(currentRoute.name);
  }, [location])
  return (
    <AppBar position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          disableRipple
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawer()}
          edge="start"
          sx={{ color: 'primary.main', mr: 5, ...(isOpen && { display: 'none' }), }}
        >
          <ArrowForwardIcon />
        </IconButton>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Tooltip title={'Logout'}>
            <LogoutIcon sx={{ color: 'primary.main', fontSize: 25, cursor: 'pointer' }} onClick={() => { localStorage.setItem('isLogin', 'false'); navigate('/') }} />
          </Tooltip>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;