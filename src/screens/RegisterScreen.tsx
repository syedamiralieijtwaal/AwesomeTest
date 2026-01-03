import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }: any) => {

    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const newErrors: any = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
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

    const onRegister = async () => {
        if (!validate()) return;

        // API call goes here
        // navigation.replace('Home');
        await register(email, password, name);
    };

    const onPressLogin = () => {
        navigation.goBack()
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.loginText}>SIGN UP</Text>
                    <Text style={styles.divider}> / </Text>
                    <TouchableOpacity onPress={onPressLogin}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Name */}
                <Input
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                {/* Email */}
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                {/* Password */}
                <Input
                    placeholder="Password"
                    secure
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={onRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Footer */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.footerText}>
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;

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
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C2C2C',
        marginBottom: 30,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 8,
        color: '#2C2C2C',
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
    button: {
        backgroundColor: '#7C92F9',
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 22,
        marginTop: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#7A7A7A',
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
});