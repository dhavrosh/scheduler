import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { pushRoute, setRightComponentAction } from '../navigation/NavigationState';


const PreviewClassView = React.createClass({
    redirectToEditClass(Class){
        this.props.dispatch(pushRoute({
            key: 'EditClass',
            title: `Edit Class`,
            data: { Class, isUpdate: Class && true || false },
            showRightComponent: 'true',
            iconName: 'save',
        }));
    },
    componentDidMount() {
        const { data: { Class } } = this.props;

        setTimeout(() => this.props.dispatch(setRightComponentAction(
            () => this.redirectToEditClass(Class)
        )), 300);
    },
    render() {
        const { data: { Class } } = this.props;

        return (
            <View style={ styles.container }>
                <Text>{ Class.title.value }</Text>
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
    }
});

export default PreviewClassView;
