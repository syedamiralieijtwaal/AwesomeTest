import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

type InputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secure?: boolean;
    keyboardType?: 'default' | 'email-address' | 'number-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    containerStyle?: any;
    inputStyle?: any;
};

const Input: React.FC<InputProps> = ({
    value,
    onChangeText,
    placeholder,
    secure = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    style,
}) => {
    const [isSecure, setIsSecure] = useState(secure);

    return (
        <View style={[styles.container, style]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9E9E9E"
                secureTextEntry={secure && isSecure}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                style={styles.input}
            />

            {secure && value.length > 0 && (
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    <Text style={styles.eyeText}>
                        {isSecure ? 'Show' : 'Hide'}
                    </Text>
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
        marginBottom: 12,
        height: 48,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        paddingVertical: 10,
        fontSize: 16,
        color: '#2C2C2C',
    },
    eyeText: {
        color: '#007AFF',
        fontWeight: '500',
        paddingHorizontal: 6,
    },
});

