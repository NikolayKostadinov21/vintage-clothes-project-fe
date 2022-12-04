import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import '../Signin/Signin.scss'
import { SIGNIN_URL } from "../../core/constants";

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
                JSON.stringify({user, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(typeof response);
            console.log(JSON.stringify(response?.data));

            setAuth({user, password});
            setUser('');
            setPassword('');
            setSuccess(true)

        } catch(error) {
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
                                    <button>Sign in</button>
                                        </div>
                                </form>

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