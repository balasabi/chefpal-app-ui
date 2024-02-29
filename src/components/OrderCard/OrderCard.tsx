import React, { useState } from "react";
import {
    Typography, Card, CardHeader, DialogActions, CardContent, Divider, Grid, List, useTheme,
    ListItem, ListItemText, CardActions, Button, Dialog, DialogTitle, ListItemButton, Chip
} from "@mui/material";

interface OrderItemObject {
    name: string;
    qty: number;
    price: number;
}

interface OrderProps {
    orderNumber: string,
    status: string,
    items: OrderItemObject[]
}

const OrderItemCard: React.FC<OrderProps> = ({ orderNumber, items, status }) => {
    const theme = useTheme();

    const [state, setState] = useState({
        statusData: ["Pending", "Prepared", "Delivered"],
        isOpen: false,
        selectedStatus: ""
    })

    const handleClose = () => {
        setState({ ...state, isOpen: false });
    };

    const handleListItemClick = (value: string) => {
        setState({ ...state, selectedStatus: value })
    };

    const changeStatus = () => {
        setState({ ...state, isOpen: false, selectedStatus: "" })
    }

    return (
        <Grid >
            <Card style={styles.cardStyle}>
                <CardHeader
                    title={<Typography style={styles.boldTitleCenterStyle} align="center">{`Order ${orderNumber}`}</Typography>}
                    subheader={<Typography style={styles.subHeaderStyle} align="center">{"September 14, 2016, 11:10 PM"}</Typography>}
                    style={{ paddingBottom: 0 }}
                />
                <CardContent>
                    <Typography style={styles.boldTitleStyle}>Prabhu</Typography>
                    <Typography variant="body2" color="text.secondary" style={styles.addressStyle}>1st street, subramaniya nagar, Madipakkam, 600091</Typography>
                    <Typography variant="body2" color="text.secondary" style={styles.addressStyle}>9994977174</Typography>

                    <Grid container >
                        <Typography style={styles.menuTitleStyle}>Order Menu</Typography>
                        <List style={styles.listStyle}>
                            {items.map((item, index) => (
                                <Chip
                                    label={
                                        <div style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
                                            <Typography style={styles.primaryFontSize}>{item.name}</Typography>
                                            <Typography style={styles.secondryActionStyle} component="span" variant="body2" >{`x${item.qty}`}</Typography>
                                        </div>
                                    }
                                    style={styles.chipStyle}
                                    color="success"
                                    size="small"
                                    variant="outlined" />
                            ))
                            }
                        </List>
                    </Grid>
                </CardContent>
                <CardActions >
                    <Button fullWidth variant="outlined" color={status === "Pending" ? "error" : status === "Prepared" ? "info" : "success"} onClick={() => setState({ ...state, isOpen: true })}>{status}</Button>
                </CardActions>

            </Card>

            <Dialog onClose={handleClose} open={state.isOpen}>
                <DialogTitle>Change Order Status</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {state.statusData.map((status) => (
                        <React.Fragment key={status}>
                            <ListItem disableGutters sx={{ background: state.selectedStatus === status ? theme.palette.secondary.main : "#FFFFFF" }}>
                                <ListItemButton onClick={() => handleListItemClick(status)}>
                                    <ListItemText primary={<Typography sx={{ color: state.selectedStatus === status ? "#FFFFFF" : "#000000" }}>{status}</Typography>} />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" style={styles.dividerMarginLeft} />
                        </React.Fragment>
                    ))}
                </List>
                <DialogActions>
                    <Button onClick={() => setState({ ...state, isOpen: false, selectedStatus: "" })} color={'error'}>Close</Button>
                    <Button onClick={() => changeStatus()}>Save</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

const styles = {
    dividerMarginLeft: { marginLeft: 0 },
    primaryFontSize: { fontSize: 12, paddingRight: 10, fontWeight: "bold" },
    secondryActionStyle: { display: 'inline', fontSize: 12, fontWeight: "bold" },
    menuTitleStyle: { fontSize: 13, fontWeight: 'bold', paddingTop: 2 },
    boldTitleStyle: { fontSize: 12, fontWeight: 'bold' },
    boldTitleCenterStyle: { fontSize: 15, fontWeight: 'bold' },
    addressStyle: { fontSize: 12 },
    subHeaderStyle: { fontSize: 10 },
    listStyle: { width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: 100, overflowY: 'auto' as 'auto' },
    cardStyle: {
        maxWidth: 345, margin: 1, border: '1px solid rgba(0,0,0,.125)', borderRadius: '0.75rem', display: 'inline-block', width: "100%"

    },
    chipStyle: {
        margin: 2
    }
};

export default OrderItemCard;