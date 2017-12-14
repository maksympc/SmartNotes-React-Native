import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    TextInput
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import firebase from '../database/Firebase'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    _signout() {
        firebase.auth().signOut().then(() => {
            alert('SIGN OUT successful!');
            Actions.pop()
        }).catch((error) => alert(error.message));
    }

    render() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user.emailVerified);
                alert('user.emailVerified: ' + user.emailVerified)
            }
        });

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._signout.bind(this)} style={styles.button}>
                    <Text>
                        SIGN OUT
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    login: {
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 40,
        marginTop: 20,
        backgroundColor: '#DDDFD3',
        padding: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5FBD31',
        height: 40,
        marginTop: 20,

    },
    btntext: {
        color: '#fff'
    }
})
