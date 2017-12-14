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
                    <Scene key="Login" component={Login} title="Login" hideNavBar={true} initial/>
                    <Scene key="Register" component={Register} title="Register" hideNavBar={true}/>
                    <Scene key="Profile" component={Profile} title="Profile" hideNavBar={false}/>
                </Scene>
            </Router>
        );
    }
}