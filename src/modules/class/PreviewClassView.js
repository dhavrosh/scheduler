import React, {PropTypes} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {pushRoute, setRightComponentAction} from '../navigation/NavigationState';

const PreviewClassView = React.createClass({
    redirectToEditClass(Class){
        this.props.dispatch(pushRoute({
            key: 'EditClass',
            title: `Edit Class`,
            data: {Class, isUpdate: Class && true || false},
            showRightComponent: 'true',
            iconName: 'save',
        }));
    },
    componentDidMount() {
        const {data: {Class}} = this.props;

        setTimeout(() => this.props.dispatch(setRightComponentAction(
            () => this.redirectToEditClass(Class)
        )), 500);
    },
    render() {
        const {data: {Class}} = this.props;

        return (
            <View style={ styles.container }>
                <View style={styles.mainSection}>
                    <View style={styles.icons}>
                        <Icon name="calendar" size={30}/>
                        <Icon name="map-marker" size={30}/>
                        <Icon name="user" size={30}/>
                    </View>
                    <View style={styles.texts}>
                        <Text >{ Class.title.value }</Text>
                        <Text >{ Class.title.value }</Text>
                        <Text >{ Class.title.value }</Text>
                    </View>
                </View>
                <View style={styles.secondarySection}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{ Class.description.value }</Text>
                </View>
            </View>
    );
    }
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
        },
        mainSection: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: 180,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray'
        },
        secondarySection: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
        icons: {
            flexDirection: 'column',
            alignItems : 'center',
            justifyContent: 'space-between',
        },
        texts: {
            marginLeft: 40,
            paddingVertical: 5,
            flexDirection: 'column',
            alignItems : 'center',
            justifyContent: 'space-between'
        },
        descriptionTitle: {
            fontSize: 16
        },
        descriptionText: {
            marginTop: 10,
            color: 'gray'
        }
    });

    export default PreviewClassView;
