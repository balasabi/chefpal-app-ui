
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { Paper, Typography } from '@mui/material';

interface NavigationProps {

}
//const CustomInput:React.FC<CustomInputProps>= ({name,multiline,rows,style}) =>{
const Navigation:React.FC<NavigationProps>= ({}) =>{
    return (
        <div style={{ padding: '20px' }}>
            <Paper style={{ border: '2px solid #d3d3d3', borderRadius: '10px', padding: '10px' }}>
                <Typography variant='h5'color="burlywood">Restaurant Details</Typography>
                <Breadcrumbs aria-label="breadcrumb"
                    separator={<NavigateNextIcon fontSize="small"/>}>
                    <Typography variant="body1" color="Highlight">Dashboard</Typography>
                    <Link underline="hover" color="inherit" href="/">
                        Restaurant
                    </Link>
                </Breadcrumbs>
            </Paper>
        </div>
    );
}

export default Navigation;
