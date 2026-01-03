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
