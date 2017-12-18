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

import RegisterForm from './RegisterForm';
import Logo from '../logo/Logo'

export default class Register extends Component {

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.logoContainer}>
                    <Logo/>
                </View>
                <View style={styles.formContainer}>
                    <RegisterForm/>
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
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,

    },
    formContainer: {
        flex: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
});