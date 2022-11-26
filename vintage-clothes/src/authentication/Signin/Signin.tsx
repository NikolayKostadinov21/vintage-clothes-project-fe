import { useRef, useState } from "react";
import { Button } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import '../Signin/Signin.scss'

const Signin = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] =  useState(false);
    const [userFocus, setUserFocus] =  useState(false);

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 5 }}>
                    </Avatar>
                    <Typography component="h1" variant="h3" className="signin-title">
                        Welcome to Vintage Clothes
                        <span className="signin-subtitle">
                            Log in to Vintage Clothes to continue with your account
                        </span>
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained">
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs sx={{ mt: 1.25 }}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>

                            <Grid item sx={{ mt: 1.25 }}>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Signin;