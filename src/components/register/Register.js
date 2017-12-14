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

export default class Register extends Component {

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../images/logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>SmartNotes: #Chat</Text>
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
        flex: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,

    },
    logo: {
        width: 230,
        height: 230,
    },
    title: {
        fontSize: 25,
        color: 'white',
        marginTop: 10,
        opacity: 0.8,
    },
    formContainer: {
        flex: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:10
    },
});