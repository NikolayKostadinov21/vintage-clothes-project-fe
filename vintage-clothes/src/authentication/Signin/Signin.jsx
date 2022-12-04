import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import '../Signin/Signin.scss';
import { SIGNIN_URL } from "../../core/constants";
import facebook_logo from '../../icons/facebook-round-color-icon.svg';
import google_logo from '../../icons/google-color-icon.svg';

const Signin = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [user, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post(SIGNIN_URL,
                JSON.stringify({ user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(typeof response);
            console.log(JSON.stringify(response?.data));

            setAuth({ user, password });
            setUser('');
            setPassword('');
            setSuccess(true)

        } catch (error) {
            if (!error.response) {
                setErrorMessage('No server response');
            } else if (error.response?.status === 400) {
                //Missing username or password
                setErrorMessage('Bad credentials');
            } else {
                setErrorMessage('Login failed');
            }
            errorRef.current.focus()
        }
    }

    return (
        <>
            {
                success ? (
                    <main>

                        <section>

                            <h1>You are logged in!</h1>
                            <br />
                            <p>
                                <a href="#">Go to Dashboard</a>
                            </p>
                        </section>
                    </main>
                ) : (
                    <div className="signin-container">
                        <section className="container">
                            <div className="wrapper">

                                <p ref={errorRef} className={errorMessage ? "errormessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

                                <div className="heading">
                                    <h1 className="text text-large">Sign in</h1>
                                </div>

                                <form onSubmit={handleSubmit} className="form">
                                    <div className="input-control">
                                        <label htmlFor="username" className="input-label" hidden >Username: </label>
                                        <input
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            className="input-field"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(event) => setUser(event.target.value)}
                                            value={user}
                                            required
                                        />
                                    </div>

                                    <div className="input-control">
                                        <label htmlFor="password" className="input-label" hidden >Password: </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            className="input-field"
                                            onChange={(event) => setPassword(event.target.value)}
                                            value={password}
                                            required
                                        />
                                    </div>

                                    <div className="input-control">
                                            <a href="#" className="text text-links">Forgot Password</a>
                                            <input type="submit" className="input-submit" value="Sign In"/>
                                    </div>
                                </form>

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

                                <p className="text text-normal">
                                    Don't have an Account? <br />
                                    <span className="line">
                                        <a href="#" className="text text-links">Sign up</a>
                                    </span>
                                </p>

                            </div>
                        </section>
                    </div>
                )}
        </>
    )
}

export default Signin;