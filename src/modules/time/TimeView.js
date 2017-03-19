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
import { generateUUID } from '../../services/mainService';
import { pushRoute, setSceneParams } from '../navigation/NavigationState';
import { removeTime } from '../class/ClassState';

const TimeView = React.createClass({
    setTimeParams(params) {
        this.props.dispatch(setSceneParams(params));
    },
    selectDays(days) {
        this.props.dispatch(pushRoute({
            key: 'Day',
            title: 'Days',
            data: { days },
            navigateBackAction: data => {
                if (data) {
                    this.setState({ days: data.days });
                    setTimeout(() => this.setTimeParams(this.state), 500);
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

                if (this.validateTimeEdges(prop, hour)) {
                    this.setState({ [prop]: { hour, minute } });
                    this.setTimeParams(this.state);
                } else {
                    // show alert
                }
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    },
    removeTimeObj() {
        const time = { id: this.state.id, remove: true };
        this.props.dispatch(removeTime(time));
    },
    getOppositeTimeEdge(origin) {
        return origin === 'start' ? 'end' : 'start';
    },
    validateTimeEdges(type, hours) {
        const oppositeTimeEdge = this.state[this.getOppositeTimeEdge(prop)];

        return !(type === 'start' && oppositeTimeEdge < hours)
                || !(type === 'end' && oppositeTimeEdge > hours);
    },
    getInitialState() {
        let initialTime = {
            id: generateUUID(),
            start: { hour: 9, minute: 0 },
            end: { hour: 10, minute: 30 },
            days: [],
        };
        const { data: { time } } = this.props;

        if (time) initialTime = time;

        return initialTime;
    },
    componentDidMount() {
      if (this.props.data.isUpdate) {
          setTimeout(() => this.setTimeParams(this.state), 500);
      }
    },
    render() {
        const { data: { isUpdate } } = this.props;
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
                        <Text style={styles.daysvalue}>{ `${start.hour}:${start.minute}` }</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => this.selectTime('end') }
                    style={styles.button}>
                    <View>
                        <Text style={styles.buttontext}>End</Text>
                    </View>
                    <View style={styles.arrowAndDb}>
                        <Text style={styles.daysvalue}>{ `${end.hour}:${end.minute}` }</Text>
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

                { isUpdate && <TouchableOpacity
                    onPress={ this.removeTimeObj }
                    style={ [styles.bigButton, styles.deleteButton] }>
                    <Icon name="remove" size={22} style={ styles.bigButtonIcon }>
                    </Icon>
                    <Text style={ styles.bigButtonText }>DELETE</Text>
                </TouchableOpacity>
                }
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
