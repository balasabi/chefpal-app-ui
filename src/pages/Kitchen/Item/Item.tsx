import * as React from 'react';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/CustomButton';


const data = [
    {
        title: "Raita",
        totalCookingTime: '2 min',
        status: 'ACTIVE',
        hasAccompaniment: false
    },
]

const Item: React.FC = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item>Items</Grid>
                    <Grid item><CustomButton /></Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                {data.map((element, index)=>
                <p key={`Items-${index.toString()}`}>{element.title}</p>)}
            </Grid>

        </Grid>
    )
}

export default Item;