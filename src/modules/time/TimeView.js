import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    TimePickerAndroid,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { generateUUID, StateProp } from '../../services/mainService';
import { pushRoute, setSceneParams } from '../navigation/NavigationState';

const TimeView = React.createClass({
    selectDays(days) {
        this.props.dispatch(pushRoute({
            key: 'Day',
            title: 'Days',
            data: { days },
            navigateBackAction: data => {
                if (data) {
                    this.setState({ days: data.days });
                    setTimeout(() => this.props.dispatch(setSceneParams(this.state)), 300);
                }
            }
        }));
    },
    async selectTime(prop) {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 9,
                minute: 0,
                is24Hour: false,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({ [prop]: `${hour}:${minute}` });
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    },
    getInitialState() {
        let initialTime = {
            id: generateUUID(),
            start: '',
            end: '',
            days: [],
        };
        /*const { data: { time } } = this.props;

        if (time) initialTime = time;*/

        return initialTime;
    },
    render() {
        const { start, end, days }  = this.state;

        return (
            <View style={ styles.container }>
                <TouchableOpacity
                    onPress={ () => this.selectTime('start') }
                    style={styles.button}>
                    <View>
                        <Text style={styles.buttontext}>Start</Text>
                    </View>
                    <View style={styles.arrowAndDb}>
                        <Text style={styles.daysvalue}>{ start }</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => this.selectTime('end') }
                    style={styles.button}>
                    <View>
                        <Text style={styles.buttontext}>End</Text>
                    </View>
                    <View style={styles.arrowAndDb}>
                        <Text style={styles.daysvalue}>{ end }</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => this.selectDays(days) }
                    style={styles.button}>
                    <View>
                        <Text style={styles.buttontext}>Days</Text>
                    </View>
                    <View style={styles.arrowAndDb}>
                        <Text style={styles.daysvalue}>{ days.join(', ') }</Text>
                        <Icon name="angle-right" size={22} style={styles.arrowRight}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    title:{
        alignSelf: 'stretch',
    },
    description:{
        alignSelf: 'stretch',

    },
    arrowRight:{
        marginLeft: 5,
        bottom: 2
    },
    button:{
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'stretch',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 0,
        marginTop: 18,
        marginBottom: 18

    },
    buttontext:{
        fontSize: 18,

    },
    arrowAndDb:{
        flexDirection: "row",
    },
    bigButton:{
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginTop: 18,
        marginBottom: 18,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent : 'center'
    },
    saveButton:{
        backgroundColor: 'rgba(58,224,29,0.7)',
    },
    deleteButton:{
        backgroundColor: 'rgba(255,0,0,0.6)',
    },
    bigButtonText:{
        marginLeft: 5,
        fontSize:14
    }
});

export default TimeView;
