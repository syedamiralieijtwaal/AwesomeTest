import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

type InputProps = {
    placeholder?: string;
    keyboardType?: any;
    secure?: boolean;
    onChangeText?: (text: string) => void;
    rightLabel?: string;
    onRightPress?: () => void;
};

const Input = ({
    placeholder,
    keyboardType,
    secure,
    onChangeText,
    rightLabel,
    onRightPress,
}: InputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9E9E9E"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onChangeText}
                style={styles.input}
                autoCapitalize='none'
            />

            {rightLabel && (
                <TouchableOpacity onPress={onRightPress}>
                    <Text style={styles.rightText}>{rightLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        marginBottom: 30,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#2C2C2C',
    },
    rightText: {
        color: '#4F6EF7',
        fontWeight: '600',
        paddingLeft: 10,
    },
});
