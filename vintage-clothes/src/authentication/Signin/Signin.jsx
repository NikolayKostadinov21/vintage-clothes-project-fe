import { useRef, useState, useEffect } from "react";
import '../Signin/Signin.scss'

const Signin = () => {

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
        console.log(user, password);
        setUser('');
        setPassword('');
        setSuccess(true);

    }

    return (
        <>
            {
                success ? (
                    <section>

                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <a href="#">Go to Dashboard</a>
                        </p>
                    </section>
                ) : (

                    <section>
                        <p ref={errorRef} className={errorMessage ? "errormessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

                        <h1>Sign in</h1>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(event) => setUser(event.target.value)}
                                value={user}
                                required
                            />

                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                required
                            />

                            <button>Sign in</button>
                        </form>

                        <p>
                            Don't have an Account? <br />
                            <span className="line">
                                <a href="#">Sign up</a>
                            </span>
                        </p>
                    </section>
                )}
        </>
    )
}

export default Signin;