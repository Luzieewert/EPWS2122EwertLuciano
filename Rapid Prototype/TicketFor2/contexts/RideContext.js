import React, {createContext, useState} from 'react';

const RideContext = createContext({});

const RideProvider = ({children}) => {
    const [ride, setRide] = useState({});
    return (
        <RideContext.Provider value={[ride,setRide]}>
            {children}
        </RideContext.Provider>
    )
}

export {RideContext, RideProvider}