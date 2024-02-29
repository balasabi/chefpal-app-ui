import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useHref, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactComponent as Logo } from '../../../../logo.svg';

import MENUS from '../pages';
import SvgIcon from '@mui/material/SvgIcon';

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.dark
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: `calc(${theme.spacing(7)} + 1px)`,
    // [theme.breakpoints.up('sm')]: {
    //     width: `calc(${theme.spacing(8)} + 1px)`,
    // },

    backgroundColor: theme.palette.primary.dark,
    width: `calc(${theme.spacing(11)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(12)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


interface SidebarProps {
    isOpen: boolean;
    handleDrawer: Function;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const Sidebar: React.FC<SidebarProps> = ({ isOpen, handleDrawer }) => {
    const location = useLocation();
    const href = useHref(location);

    return (
        <Drawer open={isOpen} variant="permanent">
            <DrawerHeader>               
                <SvgIcon component={Logo} 
                    sx={{
                        width: 75,
                        height: 75,
                        mr: isOpen ? 0 : 'auto',
                        justifyContent: 'center',
                    }}                
                    inheritViewBox
                />
                <Typography variant="h6" component="div" color={'common.white'} sx={{ opacity: isOpen ? 1 : 0 }}>
                    ChefPal
                </Typography>
                <IconButton
                    aria-label="open drawer"
                    onClick={() => handleDrawer()}
                    edge="end"
                    sx={{ color: 'common.white', ml: isOpen ? 2 : 0, opacity: isOpen ? 1 : 0 }}
                >
                    <MenuIcon />
                </IconButton>
            </DrawerHeader>
            <List>
                {MENUS.map((text, index) => (
                    <ListItem key={text.name}
                        component={NavLink}
                        to={text.href}
                        sx={{ 
                            display: 'block',                            
                            ":hover": {                           
                                '.MuiListItemButton-root':{
                                    backgroundColor: 'primary.main',
                                    borderRadius: '15px',
                                },
                            }
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: isOpen ? 'initial' : 'center',
                                px: 2.5,
                                color: "white",
                                "&.Mui-selected": {
                                    backgroundColor: 'primary.main',
                                    borderRadius: '15px',
                                    ":hover": {
                                        backgroundColor: 'primary.main',
                                        borderRadius: isOpen ? '15px' : '50%'
                                    },
                                },
                                ":hover": {
                                    backgroundColor: 'primary.main',
                                    borderRadius: '15px',
                                },
                            }}
                            selected={href === text.href}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'common.white'
                                }}>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} sx={{ opacity: isOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;