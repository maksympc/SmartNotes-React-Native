import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput
} from 'react-native';

import {Scene, Router} from 'react-native-router-flux';

import Login from './components/login/Login'
import Register from './components/register/Register'
import Profile from './components/Profile'

export default class Main extends Component {

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="signIn" component={Login} title="Login" hideNavBar={true} initial/>
                    <Scene key="signUp" component={Register} title="Register" hideNavBar={true}/>
                    <Scene key="profile" component={Profile} title="Profile" hideNavBar={true}/>
                </Scene>
            </Router>
        );
    }
}