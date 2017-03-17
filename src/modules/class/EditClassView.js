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
import { generateUUID, ClassProp } from '../../services/mainService';
import { pushRoute, setRightComponentAction } from '../navigation/NavigationState';
import { saveClass, removeClass } from './ClassState';

const dismissKeyboard = require('dismissKeyboard');

const EditClassView = React.createClass({
    /*goToDecibels() {
        dismissKeyboard();
        this.props.dispatch(pushRoute({
            key: 'Decibel',
            title: `Decibels`,
            navigateBackAction: data => data && this.setState({
                decibels: { ...this.state.decibels, value: data.decibels}
            })
        }));
    },*/
    getInitialState() {
        let initialClass = {
            id: generateUUID(),
            title: new ClassProp('', true),
            description: new ClassProp('', false)
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

        return (
            <View style={ styles.container }>
                <TextInput
                    placeholder="Title"
                    style={ styles.title }
                    value={ this.state.title.value }
                    onChangeText={ value => this.setState({
                        title: { ...this.state.title, value }
                    })}
                />
                <TextInput
                    style={ styles.descriptioni }
                    placeholder="Description"
                    multiline = { true }
                    value={ this.state.description.value }
                    onChangeText={ value => this.setState({
                        description: { ...this.state.description, value }
                    })}
                />
                {/*<TouchableOpacity
                    onPress={ this.goToDecibels }
                    style={[styles.button, this.props.isSelected && styles.selected]}>
                    <View>
                        <Text style={styles.buttontext}>Sound Limit</Text>
                    </View>
                    <View style={styles.arrowAndDb}>
                        <Text style={styles.decibelsvalue}>{ this.state.decibels.value } DB</Text>
                        <Icon name="angle-right" size={22} style={styles.arrowRight}/>
                    </View>
                </TouchableOpacity>*/}

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
    descriptioni:{
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
