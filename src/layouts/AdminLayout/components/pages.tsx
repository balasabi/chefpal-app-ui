import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import CategoryIcon from '@mui/icons-material/CategoryOutlined';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const MENUS = [
    {
        name: 'Orders',
        href: '/kitchen/orders',
        icon: <ShoppingCartCheckoutOutlinedIcon />
    },
    {
        name: 'Landing',
        href: '/landing',
        icon: <RestaurantOutlinedIcon />
    },
    {
        name: 'OrderHistory',
        href: '/order-history',
        icon: <RestaurantOutlinedIcon />
    },
    {
        name: 'Item',
        href: '/kitchen/items',
        icon: <CategoryIcon />
    },
    {
        name: 'Menu',
        href: '/kitchen/menu',
        icon: <RestaurantMenuIcon />
    },
    {
        name:'Recipe',
        href:'/kitchen/recipe',
        icon: <SoupKitchenIcon />
    }
];

export default MENUS;