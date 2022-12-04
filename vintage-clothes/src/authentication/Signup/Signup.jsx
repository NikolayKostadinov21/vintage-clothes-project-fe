import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import '../Signup/Signup.scss';
import facebook_logo from '../../icons/facebook-round-color-icon.svg';
import google_logo from '../../icons/google-color-icon.svg';
import { SIGNUP_PASSWORD_REGEX, SIGNUP_URL, SIGNUP_USER_REGEX } from "../../core/constants";

const Signup = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailfocus, setEmailfocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, seterrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(SIGNUP_USER_REGEX.test(username))
    }, [username]);

    useEffect(() => {
        setValidPassword(SIGNUP_PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        seterrorMessage('');
    }, [username, email, password, matchPassword]);

    const onSubmit = async (event) => {
        event.preventDefault();

        axios.post(SIGNUP_URL,
            JSON.stringify({ username, email, password }),
            {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true
            }
        );

        console.log({ username, email, password })

        try {
            console.log(JSON.stringify(response));
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response?.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
            setUser('');
            setPassword('');
            setMatchPassword('');
        } catch (error) {
            if (!error.response) {
                seterrorMessage('No server response');
            } else if (error.response?.status === 409) {
                seterrorMessage('Username Taken');
            } else {
                seterrorMessage('Registration failed');
            }
            errRef.current.focus()
        }
    }

    return (
        <>
            {
                success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <a href="#">Sign in</a>
                        </p>
                    </section>
                ) : (
                    <div className="signup-container">
                        <div className="container">
                            <div className="wrapper">

                                <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

                                <div className="heading">
                                    <h1 className="text text-large">Sign up</h1>
                                </div>

                                <form onSubmit={onSubmit} className="form">
                                    <div className="input-control">
                                        <label htmlFor="username" hidden>
                                            Username:
                                        </label>

                                        <input
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            onChange={(e) => setUser(e.target.value)}
                                            value={username}
                                            className="input-field"
                                            placeholder="Username"
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                    </div>

                                    <div className="input-control">
                                        <label htmlFor="email" hidden>
                                            Email:
                                        </label>

                                        <input
                                            type="text"
                                            id="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="input-field"
                                            placeholder="Email"
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setEmailfocus(true)}
                                            onBlur={() => setEmailfocus(false)}
                                        />
                                    </div>

                                    <div className="input-control">
                                        <label htmlFor="password" hidden>
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            className="input-field"
                                            placeholder="Password"
                                            required
                                            aria-invalid={validPassword ? "false" : "true"}
                                            aria-describedby="passwordnote"
                                            onFocus={() => setPasswordFocus(true)}
                                            onBlur={() => setPasswordFocus(false)}
                                        />
                                    </div>

                                    <div className="input-control">
                                        <label htmlFor="confirmPassword" hidden>
                                            Confirm Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            onChange={(e) => setMatchPassword(e.target.value)}
                                            value={matchPassword}
                                            className="input-field"
                                            placeholder="Confirm Password"
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                    </div>

                                    <div className="input-control">
                                        <input type="submit" className="input-submit" value="Sign Up" />
                                    </div>

                                    <div className="striped">
                                        <span className="striped-line"></span>
                                        <span className="striped-text">Or</span>
                                        <span className="striped-line"></span>
                                    </div>

                                    <div className="method">
                                        <div className="method-control">
                                            <a href="#" className="method-action">
                                                <img className="signin-google-facebook-icons" src={google_logo} />
                                                <span>Continue with Google</span>
                                            </a>
                                        </div>
                                        <div className="method-control">
                                            <a href="#" className="method-action">
                                                <img className="signin-google-facebook-icons" src={facebook_logo} />
                                                <span>Continue with Facebook</span>
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text text-normal signup-end-signin-text">
                                        Already have an account?
                                        <span className="line">
                                            <a href="#" className="text text-links">Sign in</a>
                                        </span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Signup