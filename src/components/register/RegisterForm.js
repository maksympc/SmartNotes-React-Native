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


const screenWidth = Dimensions.get('window').width;
export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            loading: false,
            backgroundEmailColor: whiteColor,
            backgroundPasswordColor: whiteColor,
            backgroundRepeatPasswordColor: whiteColor,
        }
    }

    componentWillMount() {
        // Add listener here
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // привязка к другому экрану, как только привязали пользователя!
                //            Actions.Profile(user);
            }
        });
    }

    _signIn = () => {
        Actions.pop();
    };

    credentialsValidation() {
        let validator = require("email-validator");
        let errorMessage = ''
        if (!validator.validate(this.state.email)) {
            errorMessage += 'Please, input correct email address! ';
        }

        if (this.state.password.length < 6) {
            errorMessage += 'Password must contains at least 6 symbols! ';

        } else if (this.state.repeatPassword < 6) {
            errorMessage += 'Repeat password must contains at least 6 symbols! ';
        }
        else if (this.state.password != this.state.repeatPassword) {
            errorMessage += 'Passwords are different!'
        }
        if (errorMessage != '') {
            alert(errorMessage);
            return false;
        }
        return true;
    }

    _signUp = () => {
        if (!this.credentialsValidation()) {
            return;
        }
        this.setState({
            // When waiting for the firebase server show the loading indicator.
            loading: true
        });
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            alert('SIGN UP is successful!');
            this.setState({
                // Clear out the fields when the user logs in and hide the progress indicator.
                email: '',
                password: '',
                loading: false
            });
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                alert('SIGN IN is successful!');
                Actions.profile();
            })
                .catch(error => {
                    alert(error.message);
                    this.setState({
                        loading: false
                    });
                }); // error when sign in
        })
            .catch((error) => {
                alert(error.message)
                this.setState({
                    loading: false
                });
            }); // error when sign up

    };

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({user: changedUser});
        })
    }

    componentWillUnmount() {
        firebase.auth().signOut().then().catch((error) => alert(error.message));
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={[styles.input, {backgroundColor: this.state.backgroundEmailColor}]}
                           placeholder='Email'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           returnKeyType='next'
                           keyboardType='email-address'
                           onSubmitEditing={() => this.passwordInput.focus()}
                           onEndEditing={() => {
                               let validator = require("email-validator");
                               if (!validator.validate(this.state.email)) {
                                   this.setState({backgroundEmailColor: notOkColor})
                               } else {
                                   this.setState({backgroundEmailColor: okColor})
                               }
                           }}
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChangeText={(email) => this.state.email = email}/>

                <TextInput style={[styles.input, {backgroundColor: this.state.backgroundPasswordColor}]}
                           placeholder='Password'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           keyboardType='default'
                           returnKeyType='next'
                           secureTextEntry={true}
                           onEndEditing={() => {
                               if (this.state.password.length < 6) {
                                   this.setState({backgroundPasswordColor: notOkColor})
                               } else {
                                   this.setState({backgroundPasswordColor: okColor})
                               }
                           }}
                           onSubmitEditing={() => this.repeatPasswordInput.focus()}
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.state.password = password}/>

                <TextInput style={[styles.input, {backgroundColor: this.state.backgroundRepeatPasswordColor}]}
                           placeholder='Repeat password'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           keyboardType='default'
                           returnKeyType='go'
                           secureTextEntry={true}
                           ref={(input) => this.repeatPasswordInput = input}
                           onEndEditing={() => {
                               if (this.state.repeatPassword.length > 5 && this.state.repeatPassword == this.state.password) {
                                   this.setState({backgroundRepeatPasswordColor: okColor})
                               } else {
                                   this.setState({backgroundRepeatPasswordColor: notOkColor})
                               }
                           }}
                           onChangeText={(repeatPassword) => this.state.repeatPassword = repeatPassword}/>

                <View flexDirection='row'>
                    <TouchableOpacity style={styles.buttonLastContainer}
                                      activeOpacity={0.5}
                                      onPress={this._signIn.bind(this)}>
                        <Text style={styles.buttonText}>{'SIGN IN'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonFirstContainer}
                                      activeOpacity={0.5}
                                      onPress={this._signUp.bind(this)}>
                        <Text style={styles.buttonText}>{'SIGN UP'}</Text>
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
        paddingBottom: 10,
    },
    input: {
        height: 45,
        width: screenWidth - 100,
        color: '#FFF',
        //  backgroundColor: whiteColor,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonFirstContainer: {
        padding: 10,
        height: 45,
        width: screenWidth - 210,
        //backgroundColor: '#2980b9',
        backgroundColor: okColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLastContainer: {
        padding: 10,
        height: 45,
        width: 100,
        marginRight: 10,
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