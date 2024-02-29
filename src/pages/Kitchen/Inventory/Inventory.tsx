import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Grid, Select, MenuItem, Typography, RadioGroup, Radio, FormControlLabel,InputAdornment } from '@mui/material';
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CustomInput from '../../../components/CustomInput';
import { useAppDispatch } from '../../../hooks';
import { displayAlert } from '../../../store/slices/notificationSlice';
import { SelectChangeEvent } from '@mui/material/Select';

// Styling for the Dialog component
const DialogStyle = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        margin: 10
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const CustomSelect = styled(Select)(({ theme }) => ({
    margin: "0px 30px 1px 20px", padding: "5px",
    width: '90%',
    "&.MuiOutlinedInput-root": {
        "& fieldset": {
            border: `1px solid ${theme.palette.secondary.light}`,
        },
        "&.Mui-focused fieldset": {
            border: `2px solid ${theme.palette.primary.main}`,
        }
    }
}));



// Inventory component definition
const Inventory: React.FC = () => {
    // State to manage the open/close state of the dialog
    const [open, setOpen] = React.useState(false);
    // Redux dispatch hook
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState(
        {
            selectedCategory: "Vegetable",
            categories: [],
            ingredients: [],
            selectedIngredient: "Onion"
        }
    );


    const categoryAction = (event: any) => {
        setState({ ...state, selectedCategory: event.target.value })
    };

    const ingredientAction = (event: any) => {
        setState({ ...state, selectedIngredient: event.target.value })
    };

    // Function to handle opening the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };


    
    // Function to handle opening snackbar and dispatching a notification
    const handleOpenSnackbar = () => {
        setOpen(false);
        // Dispatch an action to display the alert message 
        dispatch(displayAlert({ "openAlert": true, alertSeverity: "success", alertMessage: "The inventory record has been added successfully" }));
    };

console.log("*******selectedCategory*******"+JSON.stringify(state.selectedCategory))

    // Rendering the Inventory component
    return (
        <div style={styles.container}>
            {/* Button to trigger opening the dialog */}
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>
            {/* Dialog component */}
            <DialogStyle onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={"md"} >
                {/* Dialog title */}
                <DialogTitle sx={{ m: 0, p: 2, color: "#1D94C8" }} id="customized-dialog-title">
                    Add Inventory
                </DialogTitle>
                {/* Close button */}
                <IconButton aria-label="close" onClick={handleClose} sx={styles.iconButton}>
                    <DisabledByDefaultRoundedIcon style={styles.closeButtonStyle} />
                </IconButton>
                {/* Dialog content */}
                <DialogContent dividers >
                    {/* Form content */}
                    <Grid container spacing={2} style={styles.dialogContentStyle}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <div>
                                <Typography style={styles.selectBoxLableStyle}>{"Category"}</Typography>
                                <CustomSelect value={state.selectedCategory} size='small' onChange={categoryAction} displayEmpty
                                 inputProps={{
                                    startAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                  }}
                                >
                                    <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                                    <MenuItem value={"Oil"}>Oil</MenuItem>
                                    <MenuItem value={"Meat"}>Meat</MenuItem>
                                </CustomSelect>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}> <div>
                            <Typography style={styles.selectBoxLableStyle}>Ingredient</Typography>
                            <CustomSelect value={state.selectedIngredient} size='small' onChange={() => ingredientAction}  displayEmpty >
                                <MenuItem value={"Onion"}>Onion</MenuItem>
                                <MenuItem value={"Tomato"}>Tomato</MenuItem>
                                <MenuItem value={"Brinjal"}>Brinjal</MenuItem>
                            </CustomSelect>
                        </div></Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput name={"Quantity Available"} fullWidth={true} placeHolder={"Enter Quantity Available "} onChange={(event) => setState({...state,selectedCategory:event})}/></Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput name={"Minimum Stock "} fullWidth={true} placeHolder={"Enter Minimum Stock "} onChange={(event) => setState({...state,selectedCategory:event})} />  </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput name={"Maximum Stock "} fullWidth={true} placeHolder={"Enter Minimum Stock"} onChange={(event) => setState({...state,selectedCategory:event})} /></Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput name={"Reorder Point "} fullWidth={true} placeHolder={"Enter Reorder Point "} onChange={(event) => setState({...state,selectedCategory:event})} /> </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Typography style={styles.selectBoxLableStyle}>Status</Typography>
                            <RadioGroup defaultValue={"ACTIVE"} style={{ marginLeft: 20 }} row onChange={(event) => { }} >
                                <FormControlLabel value="ACTIVE" control={
                                    <Radio sx={styles.radioButtonStyle} />} label="Active" />
                                <FormControlLabel value="INACTIVE" color='#1D94C8' control={
                                    <Radio sx={styles.radioButtonStyle} />} label="Inactive" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* Dialog actions */}
                <DialogActions>
                    {/* Cancel button */}
                    <Button autoFocus onClick={handleClose}> Cancel </Button>
                    {/* Save button */}
                    <Button autoFocus onClick={handleOpenSnackbar}> Save </Button>
                </DialogActions>
            </DialogStyle>
        </div>
    );
}


// Common styles for rendering area
const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100%", marginBottom: 24 },
    iconButton: { position: 'absolute', right: 8, top: 8, color: "#1D94C8" },
    closeButtonStyle: { width: 30, height: 30 },
    dialogContentStyle: { display: "flex", alignItems: "center", margin: "10px,20px,50px,0px", marginBottom: 20 },
    selectBoxLableStyle: { margin: "0px 20px 5px 20px", color: "#000" },
    radioButtonStyle: { color: "#1D94C8", "&.Mui-checked": { color: "#1D94C8" }, },
    redioGroupStyle: { marginLeft: 20 }
};


export default Inventory;

