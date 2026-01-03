import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './Navigator';

const App = () => {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
};

export default App;
