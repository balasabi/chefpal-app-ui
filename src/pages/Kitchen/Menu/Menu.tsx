import React, { useState } from 'react';
import { Grid, Typography, Button, Dialog, DialogTitle, DialogContent, Radio, DialogActions, RadioGroup, FormControlLabel, TextField, Autocomplete } from "@mui/material";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CustomInput from '../../../components/CustomInput';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../../hooks';
import { displayAlert } from '../../../store/slices/notificationSlice';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



interface MenuState {
    menu: string;
    menuItem: string;
    title: string;
    available: boolean;
    cuisine: string;
    dietaryRestriction: string;
    mealCourse: string;
    mealTimes: string;
    price: string;
    isCombo: boolean;
    status: string;
    image: string;
    spiceLevel: string;
    likes: boolean;
    disLikes: boolean;
    quantity: string;
    menuItems: string[];
}


function Menu() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useAppDispatch();

    const [state, setState] = useState({
        menu: "",
        menuItem: "",
        title: "",
        available: false,
        cuisine: "",
        dietaryRestriction: "",
        mealCourse: "",
        mealTimes: "",
        price: "",
        isCombo: false,
        status: "ACTIVE",
        image: "",
        spiceLevel: "",
        likes: false,
        disLikes: false,
        quantity: "",
        menuItems: [1],
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Dispatch an action to display the alert message 
        // dispatch(displayAlert({ "openAlert": true, alertSeverity: "success", alertMessage: "The inventory record has been added successfully" }))
    };

    const handleOpenSnackbar = () => {
        // Dispatch an action to display the alert message 
        setOpen(false);
        dispatch(displayAlert({ "openAlert": true, alertSeverity: "success", alertMessage: "The inventory record has been added successfully" }))
    };

    const handleAddMenuItem = () => {
        setState({ ...state, menuItems: [...state.menuItems, state.menuItems.length + 1] });
    };
    const handleRemoveMenuItem = (index: number) => {
        const updatedMenuItems = [...state.menuItems];
        updatedMenuItems.splice(index, 1);
        setState((prevState) => ({
            ...prevState,
            menuItems: updatedMenuItems,
        }));
    };
    //   const handleMenuItemChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    //     const updatedMenuItems = [...state.menuItems];
    //     updatedMenuItems[index] = e.target.value;
    //     setState((prevState) => ({
    //       ...prevState,
    //       menuItems: updatedMenuItems,
    //     }));
    //   };

    const styles: { [key: string]: React.CSSProperties } = {
        flexCenter: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginBottom: 24,
        },
        dialogTitle: {
            margin: 0,
            padding: "15px 16px",
            color: "black",
        },
        closeButton: {
            position: 'absolute',
            right: 8,
            top: 8,
            color: "black",
        },
        contentContainer: {
            overflowX: 'hidden',
        },
        gridItem: {
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
        },
        radioGroup: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
    };

    return (
        <div style={{ marginTop: "10px" }}>
            <Grid container>
                <Grid item xs={12} style={{ display: "flex", flexDirection: "row" }}>
                    <Grid item xs={10}>
                        <Typography style={{ fontSize: "20px", fontWeight: "bold", paddingLeft: "10px", letterSpacing: 0.5 }}>Menu</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={handleClickOpen}>Add Menu</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                >
                    <DialogTitle style={styles.dialogTitle} id="customized-dialog-title">
                        Add Menu
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={styles.closeButton}
                    >
                        <DisabledByDefaultRoundedIcon style={{ width: 30, height: 30 }} />
                    </IconButton>
                    <DialogContent dividers style={styles.contentContainer}>
                        <Grid container spacing={2} style={styles.gridItem}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Title" placeHolder={"Title"} onChange={(e) => setState({ ...state, title: e })} />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Cuisine" placeHolder={" Cuisine"} onChange={(e) => setState({ ...state, cuisine: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Dietary Restriction" placeHolder={" Dietary Restriction"} onChange={(e) => setState({ ...state, dietaryRestriction: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Meal Course" placeHolder={"Meal Course"} onChange={(e) => setState({ ...state, mealCourse: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Meal Times" placeHolder={"Meal Times"} onChange={(e) => setState({ ...state, mealTimes: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Price" placeHolder={"Price"} onChange={(e) => setState({ ...state, price: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Image" placeHolder={"Image"} onChange={(e) => setState({ ...state, image: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Spice Level" placeHolder={"Spice Level"} onChange={(e) => setState({ ...state, spiceLevel: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <CustomInput fullWidth={true} name="Quantity" placeHolder={"Quantity"} onChange={(e) => setState({ ...state, quantity: e })} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Grid item xs={6} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                                    <Typography style={{ color: "#000" }}>IsCombo ?</Typography>
                                    <Checkbox {...label} defaultChecked />
                                </Grid>
                                <Grid item xs={6} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Typography style={{ color: "#000" }}>IsAvailable ?</Typography>
                                    <Checkbox {...label} defaultChecked />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                <Button variant="outlined" color="success" onClick={handleAddMenuItem} > Add Menu Item</Button>
                            </Grid>

                            {state.menuItems.map((menuItem, index) => (
                                <>
                                    <Grid container spacing={10} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Grid item xs={5} key={index}>
                                            {/* <CustomInput fullWidth={true} name="Menu Item" placeHolder={"Menu Item"} onChange={(e) => setState({ ...state, spiceLevel: e })} /> */}
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={[]}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params}/>}   
                                            />
                                        </Grid>
                                        <Grid item xs={2} style={{ display: "flex", alignItems: "center", marginTop: 20 }} >
                                            <IconButton onClick={() => handleRemoveMenuItem(index)}>
                                                {/* Your minus icon */}
                                                <RemoveCircleOutlineIcon style={{ width: 25, height: 25, color: "red" }} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </>

                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button autoFocus onClick={handleOpenSnackbar}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default Menu;