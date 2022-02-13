import React, {createContext, useEffect, useState} from "react"
import {getStorageItem} from "../utils/asyncStorageInteraction"
import {handleGet} from "../utils/databaseInteraction";
import {urls} from "../utils/urls";

const UserContext = createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState()

    const getUserState = async () => {
        try {
            const userId = await getStorageItem("user")
            return userId ? await handleGet(urls.user + userId, null, setUser) : setUser({})
        } catch (err) {
            setUser({})
        }
    }

    useEffect(() => {
        getUserState()
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}