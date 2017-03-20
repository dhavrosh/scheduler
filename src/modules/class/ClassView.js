import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Button,
    Text,
    View,
} from 'react-native';
import { pushRoute, setRightComponentAction } from '../navigation/NavigationState';

const ClassView = React.createClass({
    PropTypes: { classes: PropTypes.array.isRequired  },
    redirectToPreviewClass(Class){
        this.props.dispatch(pushRoute({
            key: 'PreviewClass',
            title: `${Class.title.value} Class`,
            data: { Class },
            navigationExtended: true,
            showRightComponent: 'true',
            iconName: 'edit',
        }));
    },
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
        setTimeout(() => this.props.dispatch(setRightComponentAction(
            () => this.redirectToEditClass()
        )), 300);
    },
    render() {
        const { classes } = this.props;
        return (
            <View style={ styles.container }>
                {
                    classes && classes.map((Class, index) => {
                       const redirectToClassCover = () => this.redirectToPreviewClass(Class);

                       return (
                           <TouchableOpacity
                                onPress={ redirectToClassCover }
                                style={ styles.classPanel }
                                title={ `${index}` }
                                key={ `class-${index}` }>
                                <Text style={styles.text}>{ Class.title.value }</Text>
                            </TouchableOpacity>
                       );
                    })
                }
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    classPanel: {
        alignSelf: 'stretch',
        height: 70,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        paddingLeft: 10,
        fontSize: 20
    }
});

export default ClassView;
