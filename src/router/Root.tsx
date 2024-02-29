import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/public/Landing';
import Login from '../pages/public/Login';
import Order from "../pages/Kitchen/Order";
import { AdminLayout, PublicLayout } from '../layouts';
import CustomTable from '../components/CustomTable';
import Recipe from '../pages/Kitchen/Recipe';
import Item from '../pages/Kitchen/Item';
import Menu from '../pages/Kitchen/Menu';

function Root() {
    return (
        <Routes>
            <Route path='/' element={<PublicLayout />}>
                <Route index element={<Login />} />
            </Route>

            <Route element={<AdminLayout />}>
                <Route index path="/kitchen/orders" element={<Order />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/order-history" element={<CustomTable/>} />
                <Route path='/kitchen/recipe' element={<Recipe />}/>
                <Route path="/kitchen/items" element={<Item />} />
                <Route path="/kitchen/menu" element={<Menu/>} />   
            </Route>

            <Route path="*" element={<div>No Match</div>} />
        </Routes>
    );
}

export default Root;