import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {EmailValidator} from 'email-validator';


import firebase from "../../database/Firebase";
import {Actions} from 'react-native-router-flux';
import Register from "../register/Register";

const screenWidth = Dimensions.get('window').width;

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            email: '',
            password: '',
            loading: false,
            error: '',
            backgroundEmailColor: whiteColor,
            backgroundPasswordColor: whiteColor,
        }
    }

    credentialsValidation() {

        let validator = require("email-validator");
        let errorMessage = ''
        if (!validator.validate(this.state.email)) {
            errorMessage += 'Please, input correct email address! ';
        }
        if (this.state.password.length < 6) {
            errorMessage += 'Password must contains at least 6 symbols!';
        }
        if (errorMessage != '') {
            alert(errorMessage);
            return false;
        }
        return true;
    }

    renderTextOrSpinner() {
        if (this.state.loading) {
            return <ActivityIndicator color='white' size='small'/>;
        }
        return <Text style={styles.buttonText}>{'SIGN IN'}</Text>;
    }

    _signIn = () => {
        if (!this.credentialsValidation()) {
            return;
        }
        this.setState({
            loading: true,
            error: ''
        });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
            this.setState({
                error: '',
                loading: false,
            });
            Actions.profile();
        })
            .catch(error => {
                this.setState({error: error.message, loading: false});
                alert(error.message);
            });
    };

    _signUp = () => {
        this.setState({password: '', backgroundPasswordColor: whiteColor, backgroundEmailColor: whiteColor,});
        Actions.signUp();
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={[styles.input, {backgroundColor: this.state.backgroundEmailColor}]}
                           placeholder='Email'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           returnKeyType='next'
                           keyboardType='email-address'
                           onEndEditing={() => {
                               let validator = require("email-validator");
                               if (!validator.validate(this.state.email)) {
                                   this.setState({backgroundEmailColor: notOkColor})
                               } else {
                                   this.setState({backgroundEmailColor: okColor})
                               }
                           }}
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChangeText={(email) => {
                               this.state.email = email;
                           }}/>

                <TextInput style={[styles.input, {backgroundColor: this.state.backgroundPasswordColor}]}
                           placeholder='Password'
                           keyboardType='default'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           returnKeyType='go'
                           secureTextEntry={true}
                           onEndEditing={() => {
                               if (this.state.password.length < 6) {
                                   this.setState({backgroundPasswordColor: notOkColor})
                               } else {
                                   this.setState({backgroundPasswordColor: okColor})
                               }
                           }}
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.state.password = password}/>

                <View flexDirection='row'>
                    <TouchableOpacity style={styles.buttonFirstContainer}
                                      activeOpacity={0.5}
                                      onPress={this._signIn.bind(this)}>
                        {this.renderTextOrSpinner()}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLastContainer}
                                      activeOpacity={0.5}
                                      onPress={this._signUp.bind(this)}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const okColor = 'rgba(0, 255, 153, 0.7)';
const notOkColor = 'rgba(255, 51, 51,0.8)';
const whiteColor = 'rgba(255,255,255,0.2)';
const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    input: {
        height: 45,
        width: screenWidth - 100,
        color: '#FFF',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonFirstContainer: {
        padding: 10,
        marginRight: 10,
        height: 45,
        width: screenWidth - 210,
        backgroundColor: okColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLastContainer: {
        padding: 10,
        height: 45,
        width: 100,
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
});