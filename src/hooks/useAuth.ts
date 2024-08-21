import { useState } from 'react';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Your authentication logic goes here

    return {
        isLoggedIn,
        // Any other values or functions you want to expose
    };
};

export default useAuth;