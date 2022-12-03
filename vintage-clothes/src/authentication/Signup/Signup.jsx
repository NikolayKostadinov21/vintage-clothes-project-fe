import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { SIGNUP_PASSWORD_REGEX, SIGNUP_URL, SIGNUP_USER_REGEX } from "../../core/constants";

const Signup = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

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
        setValidName(SIGNUP_USER_REGEX.test(user))
    }, [user]);

    useEffect(() => {
        setValidPassword(SIGNUP_PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        seterrorMessage('');
    }, [user, password, matchPassword]);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!SIGNUP_USER_REGEX.test(user) && !SIGNUP_PASSWORD_REGEX.test(password)) {
            seterrorMessage('Invalid Entry!');
            return;
        }

        try {
            console.log(JSON.stringify(response));
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({ user, password }),
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
                    <section>
                        <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

                        <h1>Sign up</h1>

                        <form onSubmit={onSubmit}>

                            <label htmlFor="username">
                                Username:
                            </label>

                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                4 to 24 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed <br />
                            </p>

                            <label htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="passwordnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirmPassword">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                value={matchPassword}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                Must match the first password input field.
                            </p>

                            <button disabled={!validName || !validPassword || !validMatch ? true : false}>Sign up</button>
                        </form>

                        <p>
                            Already signed up? <br />
                            <span className="line">
                                {/* routerLink here */}
                                <a href="#">Sign In</a>
                            </span>
                        </p>

                    </section>
                )
            }
        </>
    );
}

export default Signup