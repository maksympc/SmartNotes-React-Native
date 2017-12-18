import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import {Icon} from 'react-native-elements';

export default class Logo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            panTimer: new Animated.ValueXY(),
            panChat: new Animated.ValueXY(),
            panListbox: new Animated.ValueXY(),
            panCheckmark: new Animated.ValueXY(),
            panCalendar: new Animated.ValueXY(),
            timerColor: 'white',
            chatColor: 'white',
            listboxColor: 'white',
            checkmarkColor: 'white',
            calendarColor: 'white',
            titleColor: 'white',
            subtitleColor: 'white',
            isPressed: 'true',
        };

        this.panResponderTimer = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //Step 3
                dx: this.state.panTimer.x,
                dy: this.state.panTimer.y,

            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(            //Step 1
                    this.state.panTimer,         //Step 2
                    {toValue: {x: 0, y: 0}}     //Step 3
                ).start();
            }
        });

        this.panResponderChat = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //Step 3
                dx: this.state.panChat.x,
                dy: this.state.panChat.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(            //Step 1
                    this.state.panChat,         //Step 2
                    {toValue: {x: 0, y: 0}}     //Step 3
                ).start();
            }
        });

        this.panResponderListbox = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //Step 3
                dx: this.state.panListbox.x,
                dy: this.state.panListbox.y,

            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(            //Step 1
                    this.state.panListbox,         //Step 2
                    {toValue: {x: 0, y: 0}}     //Step 3
                ).start();
            }
        });

        this.panResponderCheckbox = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //Step 3
                dx: this.state.panCheckmark.x,
                dy: this.state.panCheckmark.y,

            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(            //Step 1
                    this.state.panCheckmark,         //Step 2
                    {toValue: {x: 0, y: 0}}     //Step 3
                ).start();
            }
        });

        this.panResponderCalendar = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //Step 3
                dx: this.state.panCalendar.x,
                dy: this.state.panCalendar.y,

            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(            //Step 1
                    this.state.panCalendar,         //Step 2
                    {toValue: {x: 0, y: 0}}     //Step 3
                ).start();
            }
        });


    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.renderDraggable()}
            </View>
        );
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color.toString();
    }

    _onPress = () => {
        if (this.state.isPressed) {
            this.setState({
                timerColor: this.getRandomColor(),
                chatColor: this.getRandomColor(),
                listboxColor: this.getRandomColor(),
                checkmarkColor: this.getRandomColor(),
                calendarColor: this.getRandomColor(),
                titleColor: this.getRandomColor(),
                subtitleColor: this.getRandomColor(),
            });
        } else {
            this.setState({
                timerColor: 'white',
                chatColor: 'white',
                listboxColor: 'white',
                checkmarkColor: 'white',
                calendarColor: 'white',
                titleColor: 'white',
                subtitleColor: 'white'
            });
        }
        this.setState({isPressed: !this.state.isPressed});
    };

    renderDraggable() {

        return (
            <View>
                <View style={[styles.iconsContainer, {justifyContent: 'center'}]}>
                    <Animated.View
                        {...this.panResponderTimer.panHandlers}
                        style={[this.state.panTimer.getLayout(), {marginRight: ICONSIZE}]}>
                        <Icon name="ios-timer" size={ICONSIZE} type="ionicon" color={this.state.timerColor}/>
                    </Animated.View>
                    <Animated.View
                        {...this.panResponderCheckbox.panHandlers}
                        style={[this.state.panCheckmark.getLayout()]}>
                        <Icon name="ios-checkmark-circle" size={ICONSIZE} type="ionicon"
                              color={this.state.checkmarkColor}/>
                    </Animated.View>
                </View>
                <View style={[styles.iconsContainer, {justifyContent: 'space-around'}]}>
                    <Animated.View
                        {...this.panResponderChat.panHandlers}
                        style={[this.state.panChat.getLayout()]}>
                        <Icon name="ios-chatboxes" size={ICONSIZE} type="ionicon" color={this.state.chatColor}/>
                    </Animated.View>
                    <Animated.View
                        {...this.panResponderListbox.panHandlers}
                        style={[this.state.panListbox.getLayout()]}>
                        <Icon name="ios-list-box-outline" size={ICONSIZE} type="ionicon"
                              color={this.state.listboxColor}/>
                    </Animated.View>
                    <Animated.View
                        {...this.panResponderCalendar.panHandlers}
                        style={[this.state.panCalendar.getLayout()]}>
                        <Icon name="ios-calendar" size={ICONSIZE} type="ionicon" color={this.state.calendarColor}/>
                    </Animated.View>
                </View>
                <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
                    <View alignItems='center'>
                        <Text style={[styles.title, {color: this.state.titleColor}]}>SmartNotes</Text>
                        <Text style={[styles.subtitle, {color: this.state.titleColor}]}>Better than
                            secretary!</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const ICONSIZE = 60;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 30,
    },
    subtitle: {
        fontSize: 15,
        marginTop: -5,
        marginBottom: 5
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Window.width - 100,
        height: 60,
        zIndex: 100,
    }
});