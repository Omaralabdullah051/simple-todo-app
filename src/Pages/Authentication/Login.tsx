import React, { useEffect, useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);
    const [signInWithEmailAndPassword, user, , hookError,] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleOnSubmit = e => {
        e.preventDefault();
        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;
        signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user,navigate,from]);



    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <h4>Please login</h4>
                    <input ref={emailRef} type="email" name="userEmail" id="userEmail" placeholder='Your Email' autoComplete='off' required />
                    <input ref={passwordRef} type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <p><Link to="register">Please Register</Link></p>
                    <p>{hookError && hookError.message}</p>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default Login;