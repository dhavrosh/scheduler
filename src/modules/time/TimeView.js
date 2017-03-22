import React, { PropTypes } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    TimePickerAndroid,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { generateUUID } from '../../services/mainService';
import { pushRoute, setSceneParams } from '../navigation/NavigationState';
import { removeTime } from '../class/ClassState';
import styles from '../../styles';

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
    numToTimeItem(num) {
        return parseInt(num) < 10 ? `0${num}` : num;
    },
    async selectTime(prop) {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 9,
                minute: 0,
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {

                if (this.validateTimeEdges(prop, hour)) {

                    this.setState({ [prop]: {
                        hour: this.numToTimeItem(hour),
                        minute: this.numToTimeItem(minute)
                    }});
                    this.setTimeParams(this.state);
                } else {
                    Alert.alert(
                        null,
                        'Please choose correct time',
                        [{ text: 'OK' }],
                        { cancelable: false }
                    );
                }
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    },
    removeTimeObj() {
        const time = { ...this.state, remove: true };
        this.props.dispatch(removeTime(time));
    },
    getOppositeTimeEdge(origin) {
        return origin === 'start' ? 'end' : 'start';
    },
    validateTimeEdges(type, hour) {
        const oppositeTime = this.state[this.getOppositeTimeEdge(type)].hour;

        return type === 'start' ? !(oppositeTime < hour) : !(oppositeTime > hour);
    },
    getInitialState() {
        let initialTime = {
            id: generateUUID(),
            start: { hour: '09', minute: '00' },
            end: { hour: '10', minute: '30' },
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
                <View style={[styles.fieldContainer, styles.margin]}>
                    <TouchableOpacity
                        onPress={ () => this.selectDays(days) }
                        style={[styles.button, styles.fieldUnderlined]}>
                        <View>
                            <Text style={styles.buttonText}>Days</Text>
                        </View>
                        <View style={styles.arrowAndDb}>
                            <Text style={styles.textRight}>{ days.join(', ') }</Text>
                            <Icon name="angle-right" size={22} style={styles.arrowRight}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => this.selectTime('start') }
                        style={[styles.button, styles.fieldUnderlined]}>
                        <View>
                            <Text style={styles.buttonText}>Start Time</Text>
                        </View>
                        <View style={styles.arrowAndDb}>
                            <Text style={styles.timeText}>{ `${start.hour}:${start.minute}` }</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => this.selectTime('end') }
                        style={styles.button}>
                        <View>
                            <Text style={styles.buttonText}>End Time</Text>
                        </View>
                        <View style={styles.arrowAndDb}>
                            <Text style={styles.timeText}>{ `${end.hour}:${end.minute}` }</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                { isUpdate && <View style={[styles.fieldContainer, styles.margin]}>
                    <TouchableOpacity
                        onPress={ this.removeTimeObj }
                        style={styles.deleteButton}>
                        <Icon name="remove" size={22} color="red">
                        </Icon>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }
});

export default TimeView;
