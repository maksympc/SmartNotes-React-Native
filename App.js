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

import Main from "./src/Main";

export default class App extends Component {
    render() {
        return (
            <Main/>
        );
    }
}