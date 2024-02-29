import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Link, Divider, Avatar } from "@mui/material";
import Paper from '@mui/material/Paper';
import { FaFacebookF } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                backgroundSize: 'cover',
                opacity: '500px',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Grid container style={{ justifyContent: "center", alignItems: "center" }}>
                <Grid item xs={10} sm={6} md={4} lg={3} >
                    <Grid style={{ display: "flex", flexDirection: "column" }}>

                        {/* <Typography variant="subtitle1" align="center" gutterBottom>
                        To taste your favorite recipes from around the world!
                    </Typography> */}
                    </Grid>
                    <Paper style={{ padding: "25px 25px", borderRadius: "10px", backgroundColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.2)' }}>
                        <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center", }}>
                            <Typography variant="h5" align="center" fontFamily="monospace" gutterBottom>
                                Login
                            </Typography>
                            <Grid item xs={10}>
                                <TextField
                                    label="Username"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <form onSubmit={(event) => event.preventDefault()}>
                                    <TextField
                                        type="password"
                                        label="Password"
                                        variant="standard"
                                        fullWidth
                                        required
                                        autoComplete='off'
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={10}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => { localStorage.setItem('isLogin', 'true'); navigate('/kitchen/orders') }}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography style={{ display: 'flex', flexDirection: 'row', justifyContent: "right", marginTop: "5px", paddingRight: '30px', fontWeight: 'lighter' }}>
                            <Link href="#" underline="hover" color="slateblue" fontSize="12px">  Forgot password ?</Link>
                        </Typography>

                        <Grid style={{ paddingTop: '10px', display: "flex", justifyContent: 'center' }}>
                            <Divider style={{ width: '20vw', }}>
                                <Typography align="center" style={{ fontSize: "10px", fontWeight: 'lighter', color: "#888888", letterSpacing: 1 }}>Login with</Typography>
                            </Divider>
                        </Grid>

                        <Grid style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'baseline', paddingTop: '20px' }}>
                            <Avatar style={{ backgroundColor: "#F3F3F3", cursor: "pointer" }}>
                                <FaFacebookF color="blue" />
                            </Avatar>
                            <Avatar style={{ backgroundColor: "#F3F3F3", cursor: "pointer" }}>
                                <SiGmail color="#D32F2F" />
                            </Avatar>
                            <Avatar style={{ backgroundColor: "#F3F3F3", cursor: "pointer" }}>
                                <FaInstagram color="#D24272" />
                            </Avatar>

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;