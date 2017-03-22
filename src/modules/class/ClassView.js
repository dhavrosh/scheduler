import React, {PropTypes} from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Button,
    Text,
    View,
} from 'react-native';
import {pushRoute, setRightComponentAction} from '../navigation/NavigationState';
import styles from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ClassView = React.createClass({
    PropTypes: {classes: PropTypes.array.isRequired},
    redirectToPreviewClass(Class){
        this.props.dispatch(pushRoute({
            key: 'PreviewClass',
            title: `${Class.title.value} Class`,
            subtitle: '2017 - 2018',
            data: {Class},
            navigationExtended: true,
            showRightComponent: 'true',
            iconName: 'edit',
        }));
    },
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
        setTimeout(() => this.props.dispatch(setRightComponentAction(
            () => this.redirectToEditClass()
        )), 300);
    },
    render() {
        const {classes} = this.props;
        const isClassesEmpty = classes && classes.length === 0;

        return (
            <ScrollView style={[styles.container]}>
                <View style={isClassesEmpty && styles.containerCenter}>
                    { !isClassesEmpty && <View style={[styles.fieldContainer, {paddingLeft: 0}]}>
                        {
                            classes.map((Class, index) => {
                                const redirectToClassCover = () => this.redirectToPreviewClass(Class);
                                const location = Class.location.value;

                                return (
                                    <TouchableOpacity
                                        onPress={ redirectToClassCover }
                                        style={[styles.classItem]}
                                        title={ `${index}` }
                                        key={ `class-${index}` }>
                                        <View>
                                            <Text style={styles.classText}>{ Class.title.value }</Text>
                                            <Text>{ `${location.street}, ${location.building}` }</Text>
                                        </View>
                                        <Text>{ Class.teacher.value }</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View> || <Text style={styles.messageMargin}>To add class tap on 'Plus' button</Text>
                    }
                </View>
            </ScrollView>
        );
    }
});

export default ClassView;
