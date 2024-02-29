import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, useNavigate } from 'react-router-dom';
import { Topbar, Sidebar } from './components';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => 
  localStorage.getItem('isLogin') !== 'true' ? navigate('/') : undefined
  ,[navigate])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar isOpen={open} handleDrawer={handleDrawer} />
      <Sidebar isOpen={open} handleDrawer={handleDrawer} />
      <Box component="main" sx={{ minHeight:'100vh', flexGrow: 1, p: 3, bgcolor: 'primary.light'}}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
