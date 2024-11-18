

import { useState } from 'react';
import SignUp from './SignUp'; // Assuming you have a SignUp component

const Navbar = () => {
    const [showSignUp, setShowSignUp] = useState(false);

    const handleUserIconClick = () => {
        setShowSignUp(true);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-icon">
                    aqui vai ser o menu
                </div>
                <div className="navbar-title">
                    Green Flow
                </div>
                <div className="navbar-icon" onClick={handleUserIconClick}>
                    aqui o icon de pessoa
                </div>
            </nav>
            {showSignUp && <SignUp />}
        </>
    );
};

export default Navbar;