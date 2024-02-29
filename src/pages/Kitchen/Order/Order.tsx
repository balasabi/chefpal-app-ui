import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import {
    Typography, Grid, Tabs, Tab, Box, useTheme, Button, Badge, Dialog, TextField, DialogContent,
    Stepper, Step, StepLabel, StepContent, Autocomplete, List, Divider, ListItem, ListItemText
} from "@mui/material";
import OrderCard from "../../../components/OrderCard";
import orderInIcon from "../../../assets/images/order-in.svg";
import deliveredIcon from "../../../assets/images/prepared.svg";
import preparedIcon from "../../../assets/images/delivered.svg";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CustomInput from '../../../components/CustomInput';


const DialogStyle = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        margin: 10
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const orders = [{ orderNumber: "123", status: "Pending", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }, { name: "Mutton Chukka", qty: 2, price: 170 }, { name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }, { name: "Mutton Chukka", qty: 2, price: 170 }, { name: "Fish Finger", qty: 2, price: 70 }, { name: "Mutton Chukka", qty: 2, price: 170 }] }, { orderNumber: "124", status: "Pending", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }] }, { orderNumber: "125", status: "Pending", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }] }, { orderNumber: "126", status: "Pending", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }] }, { orderNumber: "123", status: "Pending", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }, { name: "Mutton Chukka", qty: 2, price: 170 }] }]

const preparedOrders = [{ orderNumber: "121", status: "Prepared", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }] }, { orderNumber: "122", status: "Prepared", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }, { name: "Mutton Chukka", qty: 2, price: 170 }] }]

const deliveredOrders = [{ orderNumber: "120", status: "Completed", items: [{ name: "Chicken Biryani", qty: 1, price: 100 }, { name: "Fish Finger", qty: 2, price: 70 }, { name: "Mutton Chukka", qty: 2, price: 170 }] }]

const menus = [{ id: 1, name: "Chicken Biryani", price: 180 }, { id: 2, name: "Mutton Biryani", price: 280 }, { id: 3, name: "Chicken 65", price: 110 }, { id: 4, name: "Fish Finger", price: 150 }, { id: 5, name: "Mutton Chukka", price: 220 }, { id: 6, name: "Fish Fry", price: 190 }]

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: "100%" }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface selectedItemObj {
    id: number,
    name: string,
    qty: number
}

interface MyComponentState {
    value: number,
    selectdeDate: any,
    isCreateNewOrder: boolean,
    activeStep: number,
    searchText: string,
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    zipcode: string,
    selectedOrderItems: Array<{ id: number, name: string, qty: number }>,
    selectedItem: any
}

function Order() {
    const theme = useTheme();
    const [state, setState] = useState<MyComponentState>({
        value: 0,
        selectdeDate: null,
        isCreateNewOrder: false,
        activeStep: 0,
        searchText: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipcode: "",
        selectedOrderItems: [],
        selectedItem: null
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setState({ ...state, value: newValue });
    };

    const handleNext = (stepNumber: number) => {
        setState({ ...state, activeStep: stepNumber });
    };
    const styles = {
        gridGrowStyle: { width: "100%" },
        imageStyle: { height: 20, width: 20 },
        indicatorStyle: { backgroundColor: `${theme.palette.secondary.main}` },
        badgeStyle: { color: "#FFFFFF", fontSize: 10 }
    };

    const searchText = (data: string) => {
        let re = /^[0-9\b]+$/;
        if ((data === "" || re.test(data)) && data.length <= 10) {
            setState({ ...state, searchText: data });
        }
    };

    const searchConsumer = () => {

    };

    const selectOrderItem = (newValue: any) => {
        if (newValue !== null) {
            let findItem = state.selectedOrderItems.filter((x: selectedItemObj) => x.id === newValue.id);
            let addSelectedItem: any[] = [];
            if (findItem.length === 0) {
                addSelectedItem = [...state.selectedOrderItems, { ...newValue, qty: 1 }]
            } else {
                addSelectedItem = state.selectedOrderItems.map((item: selectedItemObj, i) => {
                    if (item.id === newValue.id) {
                        return { ...item, ['qty']: item.qty + 1 };
                    } else {
                        return item;
                    }
                });
            }
            setState({ ...state, selectedOrderItems: addSelectedItem, selectedItem: null })
        }
    }

    return (
        <Grid container >
            <Grid item xs={12} sm={7} md={7} >
                <Tabs value={state.value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ style: styles.indicatorStyle }}>
                    <Tab
                        icon={<img src={orderInIcon} style={styles.imageStyle} alt="order in" />}
                        iconPosition="start"
                        label={<Badge badgeContent={<Typography style={styles.badgeStyle} >{orders.length}</Typography>} color={'primary'} style={{ fontSize: 12, color: state.value === 0 ? "#3A6E21" : "#000000" }}>Order In</Badge>}{...a11yProps(0)} />
                    <Tab
                        icon={<img src={deliveredIcon} style={styles.imageStyle} alt="order in" />}
                        iconPosition="start"
                        label={<Badge badgeContent={<Typography style={styles.badgeStyle} >{preparedOrders.length}</Typography>} color="primary" style={{ fontSize: 12, color: state.value === 0 ? "#3A6E21" : "#000000" }}>Prepared</Badge>}{...a11yProps(1)} />
                    <Tab
                        icon={<img src={preparedIcon} style={styles.imageStyle} alt="order in" />}
                        iconPosition="start"
                        label={<Badge badgeContent={<Typography style={styles.badgeStyle} >{deliveredOrders.length}</Typography>} color="primary" style={{ fontSize: 12, color: state.value === 0 ? "#3A6E21" : "#000000" }}>Delivered</Badge>}{...a11yProps(2)} />
                </Tabs>
            </Grid>
            <Grid item xs={6} sm={2} md={2} >
                <Button variant="outlined" color="success" onClick={() => setState({ ...state, isCreateNewOrder: true })}>Create New Order</Button>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        //defaultValue={(new Date())}
                        views={['year', 'month', 'day']}
                        // disableFuture
                        onChange={(data) => setState({ ...state, selectdeDate: data })}
                        slotProps={{
                            textField: {
                                placeholder: 'Filter by date',
                                fullWidth: true,
                                sx: (theme) => ({

                                    '&:hover fieldset': {
                                        borderColor: `${theme.palette.primary.main} !important`,
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "5px",
                                        backgroundColor: `${theme.palette.secondary.light} !important`,
                                        border: "1px solid transparent",
                                        borderRadius: "6px",
                                        color: "#fff",
                                    }
                                })
                            }
                        }}
                        value={state.selectdeDate}
                    />
                </LocalizationProvider>
            </Grid>
            <CustomTabPanel value={state.value} index={0}>
                <Grid container rowGap={2} spacing={2} sx={styles.gridGrowStyle}>
                    {orders.map((order, index) => (
                        <Grid item xs={12} sm={3} md={3} key={`Order-${index.toString()}`}>
                            <OrderCard {...order} />
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={state.value} index={1}>
                <Grid container rowGap={2} spacing={2} sx={styles.gridGrowStyle}>
                    {preparedOrders.map((order, index) => (
                        <Grid item xs={12} sm={3} md={3} key={`Order-${index.toString()}`}>
                            <OrderCard {...order} />
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={state.value} index={2}>
                <Grid container rowGap={2} spacing={2} sx={styles.gridGrowStyle}>
                    {deliveredOrders.map((order, index) => (
                        <Grid item xs={12} sm={3} md={3} key={`Order-${index.toString()}`}>
                            <OrderCard {...order} />
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>

            <DialogStyle aria-labelledby="customized-dialog-title" open={state.isCreateNewOrder} maxWidth={"md"} fullWidth>
                <DialogContent>
                    <Stepper activeStep={state.activeStep} orientation="vertical">
                        <Step>
                            <StepLabel>
                                {'Customer Information'}
                            </StepLabel>
                            <StepContent>
                                <Grid container>
                                    <Grid item xs={12} md={12} sm={12} display="flex" direction="column" alignItems="center" justifyContent="center">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Search by phone number"
                                            onChange={(event) =>
                                                searchText(event.target.value)
                                            }
                                            InputProps={{
                                                endAdornment: state.searchText !== "" && <Button onClick={() => setState({ ...state, searchText: "" })}>Clear</Button>
                                            }}
                                            sx={{ paddingBottom: 2 }}
                                            value={state.searchText}
                                        />
                                        <Button color={"success"} disabled={state.searchText.length < 10 ? true : false} onClick={() => searchConsumer()}>Search</Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"First Name"} placeHolder={"First Name"} onChange={(value) => setState({ ...state, firstName: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"Last Name"} placeHolder={"Last Name"} onChange={(value) => setState({ ...state, lastName: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"Address Line 1"} placeHolder={"Address Line 1"} onChange={(value) => setState({ ...state, addressLine1: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"Address Line 2"} placeHolder={"Address Line 2"} onChange={(value) => setState({ ...state, addressLine2: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"City"} placeHolder={"City"} onChange={(value) => setState({ ...state, city: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"State"} placeHolder={"State"} onChange={(value) => setState({ ...state, state: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={6}>
                                        <CustomInput fullWidth={true} name={"Zipcode"} placeHolder={"Zipcode"} onChange={(value) => setState({ ...state, zipcode: value })} />
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} display="flex" direction="row" alignItems="flex-end" justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setState({ ...state, isCreateNewOrder: false })}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Cancel'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => handleNext(1)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Proceed'}
                                        </Button>

                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                {'Order Items'}
                            </StepLabel>
                            <StepContent>
                                <Grid container>
                                    <Grid item xs={12} md={12} sm={12} display="flex" direction="column" alignItems="center" justifyContent="center">
                                        <Autocomplete
                                            options={menus}
                                            fullWidth
                                            getOptionLabel={(option) => option.name}
                                            onChange={(event, newValue) =>
                                                selectOrderItem(newValue)
                                            }
                                            blurOnSelect={true}
                                            value={state.selectedItem}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select Order Item"
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        fontStyle: "normal",
                                                        fontWeight: 400,
                                                        fontSize: "16px",
                                                        lineHeight: "24px",
                                                        Letter: "0.15px",
                                                        backgroundColor: "#F0E9FF",
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            {state.selectedOrderItems.map((item: selectedItemObj, index) => (
                                                <React.Fragment key={`list-${index}`}>
                                                    <ListItem alignItems="flex-start"
                                                        secondaryAction={
                                                            <Typography sx={{ display: 'inline', fontSize: 12 }} component="span" variant="body2" color="text.primary">{`x${item.qty}`}</Typography>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography sx={{ fontSize: 12 }}>{item.name}</Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" style={{ marginLeft: 0 }} />
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} display="flex" direction="row" alignItems="flex-end" justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            color="info"
                                            onClick={() => handleNext(0)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Back'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setState({ ...state, isCreateNewOrder: false })}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Cancel'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => handleNext(2)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Proceed'}
                                        </Button>

                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                {'Order Summary'}
                            </StepLabel>
                            <StepContent>
                                <Grid container>


                                    <Grid item xs={12} md={12} sm={12} display="flex" direction="row" alignItems="flex-end" justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            color="info"
                                            onClick={() => handleNext(1)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Back'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setState({ ...state, isCreateNewOrder: false })}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Cancel'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => alert("Create Order")}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {'Create Order'}
                                        </Button>

                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
            </DialogStyle>

        </Grid>
    )
}

export default Order;