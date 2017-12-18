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

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('userData').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData,
                loading: false
            });
        }).catch((error) => {
            alert(error.message)
        });
    }

    _signout() {
        AsyncStorage.removeItem('userData').then(() => {
            this.props.firebaseApp.auth().signOut().then(() => {
                alert('SIGN OUT successful!');
                Actions.pop();
            }).catch((error) => alert(error.message));
        }).catch((error) => alert(error.message));
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text>
                        {/*//onPress={this._signout.bind(this)}*/}
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
        padding: 10,
        backgroundColor: '#3498db',
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
});
