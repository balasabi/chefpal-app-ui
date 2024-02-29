import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AspectRatioBox from '../AspectRatioBox'
import { GrSquare } from "react-icons/gr";

interface RecipeCardProps {
    name: any;
    type: any;
    price: any;
    imageSrc: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ name, type, price, imageSrc }) => {
   return (
        <Card style={{borderRadius:8,backgroundColor:"#FBFCFE", border:".5px solid #CDD7E1"}}>
            <CardContent>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <GrSquare color={type === "V" ? 'green' : "orange"} size={20} />
                </div>
                <Typography variant="body2" color="textSecondary">
                    A novel combination of our legendary basmati rice biryani{' '}<br/>
                    <Typography component="span" style={{ color: "blue" }}>
                        Read more...
                    </Typography>
                </Typography>
            </CardContent>
            <AspectRatioBox ratio={12/ 6}>
                <img src={imageSrc} alt="" style={{ width: '96%', height: '90%', objectFit: 'cover',padding:10,border:1,borderRadius:10 }}/>
            </AspectRatioBox>
            <CardContent>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Typography variant="body2" color="textSecondary">
                    Total price :
                </Typography>
                <Typography variant="body2">
                    &#x20b9; {price}
                </Typography>
                <Button variant="contained" size="medium" style={{ marginLeft: 'auto', marginTop: '1rem', fontWeight: 600 ,backgroundColor:"#175EA5",textTransform:"capitalize", borderRadius:5}}>
                    Explore
                </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default RecipeCard;