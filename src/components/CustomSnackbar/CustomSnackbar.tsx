import React from 'react';
import { Snackbar, Grid, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import chef from '../../assets/images/chef.svg';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { displayAlert } from '../../store/slices/notificationSlice';
import Slide from '@mui/material/Slide';
import { SlideProps } from '@mui/material';
import { SyntheticEvent } from 'react';

// Define props interface for CustomSnackbar component
interface CustomSnackbarProps {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}

// CustomSnackbar functional component
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ vertical, horizontal }) => {
    // Redux hooks for accessing store state and dispatch
    const dispatch = useAppDispatch();
    const { alertMessage, alertSeverity, openAlert } = useAppSelector((state) => state.notification);

    // Function to handle Snackbar close event
    const handleCloseSnackbar = (event: Event | SyntheticEvent<any, Event>, reason: string) => {
        if (reason === 'clickaway') { // If the Snackbar is closed by clicking away, do nothing
            return;
        }
        // Dispatch an action to hide the alert message
        dispatch(displayAlert({ openAlert: false, alertSeverity: "", alertMessage: "" }));
    };

    // Custom transition component for the Snackbar
    const SlideRightToLeft: React.FC<SlideProps> = (props) => {
        return <Slide {...props} direction="left" />;
    };

    // Custom content to be displayed in the Snackbar
    const CustomContent = () => (
        <div style={styles.container}>
            <Grid container spacing={5} sx={{ width: "90vw" }}>
                <Grid item xs={2} md={1} lg={1} >
                    <img src={chef} alt="Logo" width={50} height={50} />
                </Grid>
                <Grid item xs={2} md={1} lg={1} >
                    <div style={styles.lineSeparator} />
                </Grid>
                <Grid item xs={8} md={9} lg={9} style={{ marginLeft: -30 }}>
                    <Typography sx={styles.notificationTitle}>INFORMATION </Typography>
                    <Typography sx={styles.notificationSubTitle}> {alertMessage}</Typography>
                </Grid>
            </Grid>
        </div>
    );

    // Return the Snackbar component with configured props
    return (
        <Snackbar
            TransitionComponent={SlideRightToLeft}
            anchorOrigin={{ vertical, horizontal }}
            open={openAlert}
            onClose={(event, reason) => handleCloseSnackbar(event, reason)}
            autoHideDuration={2500}
            key={vertical + horizontal}
        >
            {/* MuiAlert component to display the alert message */}
            <MuiAlert elevation={1} severity={alertSeverity === "success" ? "success" : alertSeverity === "error" ? "error" : alertSeverity === "info" ? "info" : "warning"} icon={false} sx={{ width: '100%' }}>
                {/* Render custom content inside MuiAlert */}
                <CustomContent />
            </MuiAlert>
        </Snackbar>
    );
};

// Common styles for rendering area
const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "6vh" }, 
    lineSeparator: { height: 50, width: 1, backgroundColor: "green" },
    notificationTitle: { fontSize: { xs: 12, md: 12, sm: 12, lg: 16, xl: 16 }, color: "green" },
    notificationSubTitle: { fontSize: { xs: 12, md: 12, sm: 10, lg: 16, xl: 16 }, color: "green" }, 
};




export default CustomSnackbar;
