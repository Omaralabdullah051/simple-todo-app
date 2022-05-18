import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <nav className='header-container'>
            <div>
                <h2 className='title'>Todo App</h2>
            </div>
                <div className='header'>
                <Link to="/">Home</Link>
                <Link to="/managetodo">Manage-Todo</Link>
                <Link to="/viewtask">View-Task</Link>
                {
                    user ?
                        <button className='signout-button' onClick={handleSignOut}>Sign out</button>
                        :
                        <Link to="/login">Login</Link>
                }
                </div>
        </nav>
    );
};

export default Header;