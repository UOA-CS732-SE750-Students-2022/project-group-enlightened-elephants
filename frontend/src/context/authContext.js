import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [userName, setUserName] = useState(null)
    const [userId, setUserId] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const [currentTitle, setCurrentTitle] = useState(null)

    const context = {
        isLogin, setIsLogin, userName, setUserName, userId, setUserId, currentId, setCurrentId, currentTitle, setCurrentTitle
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
