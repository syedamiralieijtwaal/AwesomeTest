// import React, { createContext, useContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { STORAGE_KEYS } from '../constants/storageKeys';

// type User = {
//     name: string;
//     email: string;
// };

// type AuthContextType = {
//     user: User | null;
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     login: (email: string, password: string) => Promise<void>;
//     register: (name: string, email: string, password: string) => Promise<void>;
//     logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     /**
//      * Restore user from AsyncStorage on app launch
//      */
//     useEffect(() => {
//         const restoreUser = async () => {
//             try {
//                 const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
//                 if (storedUser) {
//                     setUser(JSON.parse(storedUser));
//                 }
//             } catch (error) {
//                 console.error('Failed to restore user:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         restoreUser();
//     }, []);

//     const login = async (email: string, password: string) => {
//         // Later: API call
//         const loggedInUser: User = {
//             name: 'John Doe',
//             email,
//         };

//         setUser(loggedInUser);
//         await AsyncStorage.setItem(
//             STORAGE_KEYS.USER,
//             JSON.stringify(loggedInUser),
//         );
//     };

//     const register = async (
//         name: string,
//         email: string,
//         password: string,
//     ) => {
//         const newUser: User = {
//             name,
//             email,
//         };

//         setUser(newUser);
//         await AsyncStorage.setItem(
//             STORAGE_KEYS.USER,
//             JSON.stringify(newUser),
//         );
//     };

//     const logout = async () => {
//         setUser(null);
//         await AsyncStorage.removeItem(STORAGE_KEYS.USER);
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 isAuthenticated: !!user,
//                 isLoading,
//                 login,
//                 register,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };


import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    email: string;
    name?: string;
};

type StoredUser = {
    email: string;
    password: string;
    name?: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'LOCAL_USER';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then(stored => {
            if (stored) {
                const parsed: StoredUser = JSON.parse(stored);
                setUser({ email: parsed.email, name: parsed.name });
            }
        });
    }, []);

    const register = async (
        email: string,
        password: string,
        name: string,
    ) => {
        const storedUser: StoredUser = {
            email,
            password,
            name,
        };

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(storedUser),
        );

        setUser({ email, name });
    };

    const login = async (
        email: string,
        password: string,
    ): Promise<boolean> => {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!stored) return false;

        const savedUser: StoredUser = JSON.parse(stored);

        if (
            savedUser.email === email &&
            savedUser.password === password
        ) {
            setUser({
                email: savedUser.email,
                name: savedUser.name,
            });
            return true;
        }

        return false;
    };

    const logout = async () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth outside provider');
    return ctx;
};
