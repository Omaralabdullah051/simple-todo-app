import { useEffect, useRef, useState } from "react";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import '../../Styles/Styles.css';

export const Register = () => {
    const [createUserWithEmailAndPassword, user, , hookError,] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const nameRef = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        imgUrl: ''
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, name: e.target.value });
    };

    const handleEmailInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const validEmail = /^\S+@\S+\.\S+$/.test(e.target.value);
        if (validEmail) {
            setUserInfo({ ...userInfo, email: e.target.value });
            setErrors({ ...errors, emailError: '' });
        }
        else {
            setUserInfo({ ...userInfo, email: '' });
            setErrors({ ...errors, emailError: 'Please Provide a valid Email' });
        }
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const strongPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/.test(e.target.value);
        if (strongPassword) {
            setUserInfo({ ...userInfo, password: e.target.value });
            setErrors({ ...errors, passwordError: '' });
        }
        else {
            setUserInfo({ ...userInfo, password: '' });
            setErrors({ ...errors, passwordError: 'Your password must contain at least one digit, lowercase, special character and min 8 characters and max 20 characters' });
        }
    };

    const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (userInfo.password === e.target.value) {
            setUserInfo({ ...userInfo, confirmPassword: e.target.value });
            setErrors({ ...errors, confirmPasswordError: '' });
        }
        else {
            setUserInfo({ ...userInfo, confirmPassword: '' });
            setErrors({ ...errors, confirmPasswordError: "Your two passwords doesn't matched" });
        }
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userInfo.confirmPassword) {
            await createUserWithEmailAndPassword(userInfo.email, userInfo.password);
            await updateProfile({ displayName: userInfo.name, photoURL: userInfo.imgUrl });
        }
    };

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        if(user){
            navigate('/');
        }
    },[]);


    return (
        <div>
            <div>
                <form className="input-group" onSubmit={handleOnSubmit}>
                    <h4>Please Register</h4>
                    <input className="first-input" onChange={handleNameInput} ref={nameRef} type="text" name="userName" id="userName" placeholder='Your Name' autoComplete='off' required />
                    <input onChange={handleEmailInput} type="email" name="userEmail" id="userEmail" placeholder='Your Email' autoComplete='off' required />
                    <p className="error">{errors?.emailError}</p>
                    <input onChange={handlePasswordInput} type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <p id="password-error" className="error">{errors?.passwordError}</p>
                    <input onChange={handleConfirmPasswordInput} type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' autoComplete='off' required />
                    <p className="error">{errors?.confirmPasswordError}</p>
                    <p className="error">{hookError && hookError.message}</p>
                    <p>Already have an account? <Link className="login" to="login">Please login</Link></p>
                    <input className="form-submit" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};
