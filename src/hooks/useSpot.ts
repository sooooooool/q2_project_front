import { useState } from 'react';

const useSpot = () => {
    const [spot, setSpot] = useState('');

    // Add your custom logic here

    return spot;
};

export default useSpot;