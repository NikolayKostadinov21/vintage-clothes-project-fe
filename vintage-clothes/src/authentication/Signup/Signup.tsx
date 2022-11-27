import { useEffect, useRef, useState } from "react";
import { SIGNUP_PASSWORD_REGEX, SIGNUP_USER_REGEX } from "../../core/constants";
import { Button } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import '../Signup/Signup.scss'

const Signup = () => {

    const userRef = useRef<HTMLTextAreaElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        const result = SIGNUP_USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        setValidPassword(SIGNUP_PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [user, password, matchPassword])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const checkUser = SIGNUP_USER_REGEX.test(user);
        const checkPassword = SIGNUP_PASSWORD_REGEX.test(password);
        
        if (!checkUser || !checkPassword) {
            setErrorMessage("Invalid Entry!");
            return;
        }

        console.log(user, password);
        setSuccess(true);
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit}>
                    <Container component="main" maxWidth="xs">
                        <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive"> {errorMessage} </p>
                        <CssBaseline />
                        <Box sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Avatar sx={{ m: 5 }}>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Welcome to Vintage Clothes
                                <span className="signup-subtitle">
                                </span>
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            label="First Name"
                                            id="firstName"
                                            autoFocus
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="lastName"
                                            label="Last Name"
                                            id="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="email"
                                            label="Email Address"
                                            id="email"
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
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            sx={{ m: 2 }}
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="Receive information about future sellouts"
                                            labelPlacement='end'
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                    variant="contained">
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item sx={{ mt: 1.25 }}>
                                        <Link href="#" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </form>
            </section>
        </>
    )
}

export default Signup;