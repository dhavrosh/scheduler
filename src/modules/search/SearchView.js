import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    View
} from 'react-native';
import styles from '../../styles';
import { pushRoute, setSearchAction } from '../navigation/NavigationState';

const SearchView = React.createClass({
    propTypes: {},
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
    getInitialState() {
        return {classes: [] }
    },
    componentDidMount() {
        setTimeout(() => this.props.dispatch(setSearchAction(
            classes => this.setState({ classes })
        )), 300);
    },
    render() {
        const { classes } = this.state;
        const isClassesEmpty = classes && classes.length === 0;

        return (
                <View style={[styles.container, isClassesEmpty && styles.containerCenter]}>
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
                </View> || <Text>Search your classes...</Text>
                }
            </View>
        );
    }
});

export default SearchView;
