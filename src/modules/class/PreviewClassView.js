import React, {PropTypes} from 'react';
import {
    ScrollView,
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
        const days = Class.times.value.reduce((days, time) => {
            time.days.forEach(day => {
                if (!days.includes(day)) days.push(day);
            });

            return days;
        }, []);

        return (
            <ScrollView style={ styles.container }>
                    <View style={styles.mainSection}>
                        <View style={styles.icons}>
                            <Icon name="calendar-check-o" size={30}/>
                            <Icon name="map-marker" size={30}/>
                            <Icon name="male" size={30}/>
                        </View>
                        <View style={styles.texts}>
                            <Text style={styles.iconText}>{ days.join(', ') }</Text>
                            <Text style={styles.iconText}>{ Class.title.value }</Text>
                            <Text style={styles.iconText}>{ Class.title.value }</Text>
                        </View>
                    </View>
                    <View style={styles.secondarySection}>
                        { Class.description.value !== '' && <View>
                            <Text style={styles.secondaryTitle}>Description</Text>
                            <Text style={styles.secondaryText}>{ Class.description.value }</Text>
                        </View>}
                        <Text style={[styles.secondaryTitle, styles.secondaryMargin]}>Times</Text>
                        <View style={styles.secondaryText}>
                            { Class.times.value.map(time => <Text key={`time-${time.id}`}>
                                {`${time.days.join(', ')} - ${time.start.hour}:${time.start.minute} - ${time.end.hour}:${time.end.minute}`}
                            </Text>)
                            }
                        </View>
                    </View>
            </ScrollView>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    texts: {
        marginLeft: 30,
        paddingVertical: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    secondaryTitle: {
        fontSize: 16,
        color: '#393939'
    },
    secondaryMargin: {
        marginTop: 15
    },
    iconText: {
        color: 'gray'
    },
    secondaryText: {
        marginTop: 5,
    }
});

export default PreviewClassView;
