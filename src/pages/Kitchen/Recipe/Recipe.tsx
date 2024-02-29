import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Grid, Typography,Select ,MenuItem} from '@mui/material';
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CustomInput from '../../../components/CustomInput';
import { useAppDispatch } from '../../../hooks';
import { displayAlert } from '../../../store/slices/notificationSlice';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { align, font, fontColor, fontSize, formatBlock, hiliteColor, horizontalRule, lineHeight, list, paragraphStyle, table, template, textStyle, image, link } from "suneditor/src/plugins";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface IRichTextEditorProps {
    richTextEditorHtml?: string;
    onRichTextEditorChange?: (content: string) => void;
    displayMode?: "EDIT" | "READ_ONLY";
}

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


const Recipe: React.FC<IRichTextEditorProps> = ({
    richTextEditorHtml,
    onRichTextEditorChange,
    displayMode
}) => {

    const [richTextEditor, setRichTextEditor] = React.useState<string>(
        richTextEditorHtml || ""
    );

    const handleChange = (content: string) => {
        setRichTextEditor(content);
        //onRichTextEditorChange(content);
    };
    const dispatch = useAppDispatch();

    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        quantity: "",
        imageUrl: "",
        videoUrl: "",
        preparationTime: "",
        instruction: "",
        status: "",
        numberOfServe: "",
        nutritionalBenefit: "",
        ingrendient: [1],
        selectedItem:"CB"
    });

    // Function to handle opening the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };


    const itemAction = (event: any) => {
        setState({ ...state, selectedItem: event.target.value })
    };
    // Function to handle opening snackbar and dispatching a notification
    const handleOpenSnackbar = () => {
        setOpen(false);
        // Dispatch an action to display the alert message 
        dispatch(displayAlert({ "openAlert": true, alertSeverity: "success", alertMessage: "The recipe record has been added successfully" }));
    };

    const addIngredient = () => {
        setState({ ...state, ingrendient: [...state.ingrendient, state.ingrendient.length + 1] });
    };

    const deleteAction = async (index: any) => {
        let result = await state.ingrendient.filter((item) => item !== index)
        setState({ ...state, ingrendient: result })
    };

    // Rendering the Inventory component
    return (
        <div style={styles.container}>
            <Grid container>
                <Grid item xs={12} style={{ display: "flex", flexDirection: "row" }}>
                    <Grid item xs={10}>
                        <Typography style={styles.headerText}>Recipes</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={handleClickOpen}>Add Recipe</Button>
                    </Grid>
                </Grid>
                <DialogStyle onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={"md"} >
                    <DialogTitle sx={{ m: 0, p: 2, }} id="customized-dialog-title">
                        Add Recipe
                    </DialogTitle>
                    <IconButton aria-label="close" onClick={handleClose} sx={styles.iconButton}>
                        <DisabledByDefaultRoundedIcon style={styles.closeButtonStyle} />
                    </IconButton>
                    <DialogContent dividers>
                        <Grid container spacing={2} style={styles.dialogContentStyle}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><div>
                            <Typography style={styles.selectBoxLableStyle}>Items</Typography>
                            <CustomSelect value={state.selectedItem} size='small' onChange={() => itemAction}  displayEmpty >
                                <MenuItem value={"CB"}>Chicken Biryani </MenuItem>
                                <MenuItem value={"MB"}>Mutton Biryani</MenuItem>
                                <MenuItem value={"HVDB"}>Hyderabadi Veg Dum Biryani</MenuItem>
                            </CustomSelect>
                           </div></Grid>
                           <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput fullWidth={true} name={"Quantity Available"} placeHolder={"Enter Quantity Available"} onChange={(e) => setState({ ...state, quantity: e })} /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput fullWidth={true} name={"Image URL"} placeHolder={"Image URL"} onChange={(e) => setState({ ...state, imageUrl: e })} /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput fullWidth={true} name={"Video URL"} placeHolder={"Video URL"} onChange={(e) => setState({ ...state, videoUrl: e })} /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput fullWidth={true} name={"Preparation Time"} placeHolder={"Preparation Time"} onChange={(e) => setState({ ...state, preparationTime: e })} /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput fullWidth={true} name={"Number of Serve"} placeHolder={"Number of Serve"} onChange={(e) => setState({ ...state, numberOfServe: e })} /></Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><CustomInput fullWidth={true} name={"Nutritional Benefit"} placeHolder={"Nutritional Benefit"} onChange={(e) => setState({ ...state, nutritionalBenefit: e })} /></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Typography style={{ margin: "0px 20px 5px 20px", color: "#000" }}>Cooking Instructions</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: "0px 0px 5px 20px" }}>
                                <SunEditor lang="en" setOptions={{
                                    showPathLabel: false, minHeight: "20vh", maxHeight: "50vh", placeholder: "Cooking Instructions",
                                    plugins: [align, font, fontColor, fontSize, formatBlock, hiliteColor, horizontalRule, lineHeight, list, paragraphStyle, table, template, textStyle, image, link],
                                    buttonList: [["undo", "redo"], ["font", "fontSize", "formatBlock"], ["paragraphStyle"], ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                                    ["fontColor", "hiliteColor"], ["removeFormat"], "/", ["outdent", "indent"],
                                    ["align", "horizontalRule", "list", "lineHeight"], ["table", "link", "image"]],
                                    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                                    
                                    font: ["Arial", "Calibri", "Comic Sans", "Courier", "Garamond", "Georgia", "Impact", "Lucida Console", "Palatino Linotype", "Segoe UI", "Tahoma", "Times New Roman", "Trebuchet MS"],
                                    
                                }}
                                    defaultValue={richTextEditorHtml}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                <Button variant="outlined" color="success" onClick={() => addIngredient()} ><AddIcon color="secondary" />Add Ingredient</Button>
                            </Grid>
                            {state.ingrendient.map((item, index) =>
                                <Grid container key={index.toString()} style={{ display: "flex", flexDirection: "row", padding: "0px 0px 5px 50px", borderBottomWidth: 1, borderBottomColor: "gray" }}>
                                    <Grid item xs={11} lg={11} xl={11} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
                                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}><CustomInput fullWidth={true} name={"Ingredient"} placeHolder={"Ingredient"} onChange={(e) => setState({ ...state, imageUrl: e })} /></Grid>
                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={5}><CustomInput fullWidth={true} name={"Quantity"} placeHolder={"Quantity"} onChange={(e) => setState({ ...state, imageUrl: e })} /></Grid>
                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}><CustomInput fullWidth={true} name={"Unit"} placeHolder={"Unit"} onChange={(e) => setState({ ...state, imageUrl: e })} /></Grid>
                                    </Grid>
                                    <Grid item xs={1} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <Grid item xs={12} sm={1} md={1} lg={1} xl={1} style={{ marginTop: "25px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <IconButton onClick={() => deleteAction(index + 1)}><RemoveCircleOutlineIcon color="primary" /></IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}> Cancel </Button>
                        <Button autoFocus onClick={handleOpenSnackbar}> Save </Button>
                    </DialogActions>
                </DialogStyle>
            </Grid>
        </div>
    )
};

// Common styles for rendering area
const styles = {
    container: { display: "flex",  height: "100%", marginBottom: 24 },
    headerText: { fontSize: "20px", fontWeight: "bold", paddingLeft: "10px", letterSpacing: 0.5 },
    iconButton: { position: 'absolute', right: 8, top: 8, color: "#1D94C8" },
    closeButtonStyle: { width: 30, height: 30, color: "#000" },
    dialogContentStyle: { display: "flex", alignItems: "center", margin: "10px,20px,50px,0px", marginBottom: 20 },
    selectBoxLableStyle: { margin: "0px 20px 5px 20px", color: "#000" },
    radioButtonStyle: { color: "#1D94C8", "&.Mui-checked": { color: "#1D94C8" } },
    redioGroupStyle: { marginLeft: 20 },
    gridHeader: { display: "flex", flexDirection: "row" }
};

export default Recipe;
