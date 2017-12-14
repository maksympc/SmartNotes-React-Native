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
        }
    }

    componentWillMount() {
        // Add listener here
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // привязка к другому экрану, как только привязали пользователя!
                Actions.Profile(user);
            }
        });
    }

    _signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            alert('SIGN UP is successful!');
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                alert('SIGN IN is successful!');
            })
                .catch(error => alert(error.message)); // error when sign in
        })
            .catch((error) => alert(error.message)); // error when sign up

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
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           keyboardType='default'
                           returnKeyType='next'
                           secureTextEntry={true}
                           onSubmitEditing={() => this.repeatPasswordInput.focus()}
                           ref={(input) => this.passwordInput = input}
                           onChangeText={(password) => this.state.password = password}/>

                <TextInput style={styles.input}
                           placeholder='repeat password'
                           placeholderTextColor='rgba(255,255,255,0.7)'
                           keyboardType='default'
                           returnKeyType='go'
                           secureTextEntry={true}
                           ref={(input) => this.repeatPasswordInput = input}
                           onChangeText={(repeatPassword) => this.state.repeatPassword = repeatPassword}/>

                <View flexDirection='row'>
                    <TouchableOpacity style={styles.buttonLastContainer}
                                      activeOpacity={0.5}
                                      onPress={alert('SIGN IN is pressed!')}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonFirstContainer}
                                      activeOpacity={0.5}
                                      onPress={this._signUp.bind(this)}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
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