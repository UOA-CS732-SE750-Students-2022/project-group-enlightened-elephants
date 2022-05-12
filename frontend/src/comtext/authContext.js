import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [userName, setUserName] = useState(null)
    const [userId, setUserId] = useState(null)

    const context = {
        isLogin, setIsLogin, userName, setUserName, userId, setUserId
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
