
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {

    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [secure, setSecure] = useState(true);

    const onPressSignup = () => {
        navigation.navigate('Register');
    };

    const validate = () => {
        const newErrors: any = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newErrors.email = 'Enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onLogin = async () => {
        if (!validate()) return;

        // navigation.replace('Home');
        const success = await login(email, password);
        if (!success) {
            Alert.alert('Invalid credentials');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.loginText}>LOGIN</Text>
                    <Text style={styles.divider}> / </Text>
                    <TouchableOpacity onPress={onPressSignup}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <Input
                    placeholder="Password"
                    secure
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                {/* Button */}
                <TouchableOpacity onPress={onLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4F6EF7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingVertical: 40,
        paddingHorizontal: 28,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    loginText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C2C2C',
    },
    divider: {
        fontSize: 18,
        color: '#BDBDBD',
        marginHorizontal: 6,
    },
    signupText: {
        fontSize: 18,
        color: '#BDBDBD',
        fontWeight: '400',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 30,
        color: '#2C2C2C',
    },
    button: {
        backgroundColor: '#7C92F9',
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 22,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        marginTop: 10,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#2C2C2C',
    },
    eyeText: {
        color: '#4F6EF7',
        fontWeight: '600',
    },
    error: {
        color: '#E53935',
        fontSize: 12,
        marginTop: 4,
    },
});
