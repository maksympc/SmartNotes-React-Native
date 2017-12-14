import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import firebase from "../../database/Firebase";
import {Actions} from 'react-native-router-flux';
import Register from "../register/Register";

const screenWidth = Dimensions.get('window').width;

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    componentWillUnmount() {
        // Add listener here
        this.unsubscribe()
    }


    _signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => alert('SIGN IN is successful!'))
            .catch(error => alert(error.message));
    };


    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.input}
                           placeholder='email'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           returnKeyType='next'
                           keyboardType='email-address'
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChangeText={(email) => this.state.email = email}/>

                <TextInput style={styles.input}
                           placeholder='password'
                           keyboardType='default'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           returnKeyType='go'
                           secureTextEntry={true}
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.state.password = password}/>

                <View flexDirection='row'>
                    <TouchableOpacity style={styles.buttonFirstContainer}
                                      activeOpacity={0.5}
                                      onPress={this._signIn.bind(this)}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLastContainer}
                                      activeOpacity={0.5}
                                      onPress={alert('SING UP is pressed!')}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    input: {
        height: 45,
        width: screenWidth - 100,
        color: '#FFF',
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonFirstContainer: {
        padding: 10,
        height: 45,
        width: screenWidth - 200,
        backgroundColor: '#2980b9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLastContainer: {
        padding: 10,
        height: 45,
        width: 100,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
});