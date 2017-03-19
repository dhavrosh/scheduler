import React, { PropTypes } from 'react';
import {
    StyleSheet,
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

const dismissKeyboard = require('dismissKeyboard');

const EditClassView = React.createClass({
    createTime(time) {
        dismissKeyboard();
        this.props.dispatch(pushRoute({
            key: 'Time',
            title: 'Time',
            data: { time },
            navigateBackAction: data => data && this.handleTimeObj(data)
        }));
    },
    handleTimeObj(obj) {
        let newTimes = this.state.times.value.slice();
        const index = newTimes.findIndex(time => time.id === obj.id);

        if (index > -1) {
            newTimes[index] = obj;
        } else {
            newTimes = [...newTimes, obj];
        }

        this.setState({ times: { ...this.state.times, value: newTimes } })
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
                <TextInput
                    placeholder="Title"
                    style={ styles.title }
                    value={ title.value }
                    onChangeText={ value => this.setState({
                        title: { ...title, value }
                    })}
                />
                <TextInput
                    style={ styles.description }
                    placeholder="Description"
                    multiline = { true }
                    value={ description.value }
                    onChangeText={ value => this.setState({
                        description: { ...description, value }
                    })}
                />
                <TouchableOpacity
                    onPress={ () => this.createTime(times.value) }
                    style={[styles.button, this.props.isSelected && styles.selected]}>
                    <View>
                        <Text style={styles.buttontext}>Create Time</Text>
                    </View>
                    <View style={styles.arrowAndDb}>
                        <Icon name="angle-right" size={22} style={styles.arrowRight}/>
                    </View>
                </TouchableOpacity>

                { times.value && times.value.map(time =>
                    <TouchableOpacity
                        onPress={ () => {} }
                        key={ time.id }
                        style={ styles.button }>
                        <View>
                            <Text style={ styles.buttontext }>{ time.start } - { time.end }</Text>
                        </View>
                    </TouchableOpacity>
                ) }

                { isUpdate && <TouchableOpacity
                    onPress={this.removeClassObj}
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

export default EditClassView;
