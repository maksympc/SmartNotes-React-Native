import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';

import LoginForm from './LoginForm';
import Logo from '../logo/Logo';

export default class Login extends Component {

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.logoContainer}>
                    <Logo/>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },
    logoContainer: {
        flex: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    formContainer: {
        flex: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
});