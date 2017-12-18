import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    TextInput,
    Alert,
    Dimensions,
    Image
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import firebase from '../database/Firebase'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        }
    }

    componentWillMount() {
        this.setState({user: firebase.auth().currentUser});
    }

    componentDidMount() {
        Alert.alert("Welcome!", "We are glad to see you here! Have a nice time!", {text: 'OK'});
    }

    _signout() {
        firebase.auth().signOut().catch((error) => alert(error.message));
        Actions.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View flex={30} style={{backgroundColor: 'aquamarine'}}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this._signout.bind(this)}>
                        <Text style={styles.buttonText}>
                            SIGN OUT
                        </Text>
                    </TouchableOpacity>
                    <View flexDirection='row'>
                        <View>
                            <TouchableOpacity onPress={() => alert("Sorry, you can't change this IMAGE now!")}>
                                <Image style={styles.profileImage} source={require('../../images/profile.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textContainer}>
                            <TouchableOpacity onPress={() => alert("Sorry, you can't change NAME now!")}>
                                <Text style={styles.text}>Name:{this.state.user.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert("Sorry, you can't change this EMAIL now!")}>
                                <Text style={styles.text}>Email:{this.state.user.email}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View flex={70} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'cyan'}}>
                    <TouchableOpacity onPress={() => alert("Sorry, you can't add TASKS now!")}>
                        <Text style={{fontSize: 50}}>Рабочая область</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


let window = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(102, 0, 102)',
        height: 40,
        marginTop: 20,

    },
    buttonText: {
        color: '#fff'
    },
    textContainer: {
        height: 100,
        width: window.width - 100,
        backgroundColor: 'white',
        opacity: 0.8
    },
    profileImage: {
        width: 150,
        height: 150,
        backgroundColor: 'yellow'
    },
    text: {
        paddingTop: 10,
        fontWeight: "500",
        fontSize: 30
    }
});
