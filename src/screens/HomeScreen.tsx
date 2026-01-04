import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    const { user, logout } = useAuth();

    const onLogout = () => {
        logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Welcome</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{user?.name ?? '-'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user?.email ?? '-'}</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

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
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        marginBottom: 30,
    },
    infoRow: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#8E8E8E',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C2C2C',
        marginTop: 4,
    },
    logoutButton: {
        backgroundColor: '#E53935',
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 22,
        marginTop: 40,
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
