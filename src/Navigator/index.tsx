import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
    const { isAuthenticated } = useAuth();

    const renderAuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen}
                    options={{
                        headerShown: true,
                        title: 'Sign Up',
                    }}
                />
            </Stack.Navigator>
        );
    }

    const renderMainStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        );
    }

    const renderStack = () => {
        return isAuthenticated ? renderMainStack() : renderAuthStack();
    }

    const Content = renderStack();

    return (
        <NavigationContainer>
            {Content}
        </NavigationContainer>
    );
};

export default AppNavigator;
