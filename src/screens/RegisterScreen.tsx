import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
    const { register } = useAuth();

    // UI state only
    const [secure, setSecure] = useState(true);
    const [hasPassword, setHasPassword] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // Form refs
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const validate = () => {
        const newErrors: any = {};

        const name = nameRef.current.trim();
        const email = emailRef.current.trim();
        const password = passwordRef.current;

        if (!name) {
            newErrors.name = 'Name is required';
        }

        if (!email) {
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

        await register(
            emailRef.current.trim(),
            passwordRef.current,
            nameRef.current.trim()
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.loginText}>SIGN UP</Text>
                        <Text style={styles.divider}> / </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.signupText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Name */}
                    <Input
                        placeholder="Name"
                        onChangeText={text => {
                            nameRef.current = text;
                        }}
                    />
                    {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                    {/* Email */}
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={text => {
                            emailRef.current = text;
                        }}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    {/* Password */}
                    <Input
                        placeholder="Password"
                        secure={secure}
                        onChangeText={text => {
                            passwordRef.current = text;
                            setHasPassword(text.length > 0);
                        }}
                        rightLabel={hasPassword ? (secure ? 'Show' : 'Hide') : undefined}
                        onRightPress={() => setSecure(prev => !prev)}
                    />
                    {errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}

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
            </ScrollView>
        </KeyboardAvoidingView>
    );

};

export default RegisterScreen;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#4F6EF7', // MUST be here
    },
    scrollContent: {
        flexGrow: 1,                 // critical for Android
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
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