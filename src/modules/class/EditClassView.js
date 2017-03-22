import React, { PropTypes } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { generateUUID, StateProp } from '../../services/mainService';
import { pushRoute, setRightComponentAction } from '../navigation/NavigationState';
import { saveClass, removeClass } from './ClassState';
import styles from '../../styles';

const dismissKeyboard = require('dismissKeyboard');

const EditClassView = React.createClass({
    createTime(time) {
        dismissKeyboard();
        this.props.dispatch(pushRoute({
            key: 'Time',
            title: 'Time',
            data: { time, isUpdate: time && true || false },
            navigateBackAction: data => data && this.handleTimeObj(data)
        }));
    },
    handleTimeObj(obj) {
        if (obj.days.length > 0) {
            let newTimes = this.state.times.value.slice();
            const index = newTimes.findIndex(time => time.id === obj.id);

            if (obj.hasOwnProperty('remove') && obj.remove === true) {
                newTimes = newTimes.filter(time => time.id !== obj.id);
            } else if (index > -1) {
                newTimes[index] = obj;
            } else {
                newTimes = [...newTimes, obj];
            }

            this.setState({times: {...this.state.times, value: newTimes}})
        } else console.warn('Days are required for time objects');
    },
    getInitialState() {
        let initialClass = {
            id: generateUUID(),
            title: new StateProp('', true),
            description: new StateProp('', false),
            times: new StateProp([], false),
        };
        const { data: { Class } } = this.props;

        if (Class) initialClass = Class;

        return initialClass;
    },
    componentDidMount() {
        setTimeout(() => this.props.dispatch(setRightComponentAction(
            () => this.saveClassObj()
        )), 300);
    },
    saveClassObj() {
        const emptyProps = [];

        dismissKeyboard();

        for (const prop in this.state) {
            if (this.state.hasOwnProperty(prop)
                && this.state[prop].isRequired && !this.state[prop].value) {
                emptyProps.push(prop.toLocaleUpperCase());
            }
        }

        if (emptyProps.length === 0) {
            this.props.dispatch(saveClass(this.state))
        } else {
            const message = `${ emptyProps.join(', ') } ${ emptyProps.length > 1 ? 'need' : 'needs' } to be filled`;
            Alert.alert(
                null,
                message,
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    },
    removeClassObj() {
        Alert.alert(
            null,
            'Do you really want to delete class?',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => {
                    const id = this.state.id;
                    this.props.dispatch(removeClass(id));
                }},
            ],
            { cancelable: false }
        );
    },
    render() {
        const { data: { isUpdate } } = this.props;
        const { title, description, times }  = this.state;

        return (
            <View style={ styles.container }>
                <View style={styles.labelContainer}>
                    <Text>General</Text>
                </View>
                <View style={[styles.fieldContainer]}>
                    <TextInput
                        placeholder="Title"
                        style={[styles.textInput, styles.fieldUnderlined]}
                        value={ title.value }
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        keyboardType='default'
                        onChangeText={ value => this.setState({
                            title: { ...title, value }
                        })}
                    />
                    <TextInput
                        style={[styles.textInput]}
                        placeholder="Description"
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        keyboardType='default'
                        value={ description.value }
                        onChangeText={ value => this.setState({
                            description: { ...description, value }
                        })}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text>Times</Text>
                </View>
                <View style={[styles.fieldContainer]}>
                    <TouchableOpacity
                        onPress={ () => this.createTime() }
                        style={[styles.button, styles.fieldUnderlined]}>
                        <View>
                            <Text style={styles.buttonText}>Create Time</Text>
                        </View>
                        <View style={styles.arrowAndDb}>
                            <Icon name="angle-right" size={22} style={styles.arrowRight}/>
                        </View>
                    </TouchableOpacity>
                    { times.value && times.value.map(time =>
                        <TouchableOpacity
                            onPress={ () => this.createTime(time) }
                            key={ time.id }
                            style={ styles.button }>
                            <View>
                                <Text style={ styles.buttonText }>{ `${time.start.hour}:${time.start.minute} - ${time.end.hour}:${time.end.minute}` }</Text>
                                <Text style={{ fontSize: 10 }}>{ time.days.join(', ') }</Text>
                            </View>
                            <View style={styles.arrowAndDb}>
                                <Icon name="angle-right" size={22} style={styles.arrowRight}/>
                            </View>
                        </TouchableOpacity>
                ) }
                </View>
                { isUpdate && <View style={[styles.fieldContainer, styles.margin]}>
                    <TouchableOpacity
                        onPress={ this.removeClassObj }
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

export default EditClassView;
