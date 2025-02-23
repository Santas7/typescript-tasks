import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export default function AuthContextProvider( {children} ) {

    const [user, setUser] = useState(null)

    const signin = (data, callback) => {
        setUser(data)
        callback()
    }
    
    const signout = (callback) => {
        setUser(null)
        callback()
    }

    return (
        <AuthContext.Provider value={
            {
                user, 
                signin, 
                signout
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}