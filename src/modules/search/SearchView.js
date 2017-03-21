import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

const SearchView = React.createClass({
    propTypes: {},
    getInitialState() {
        return { }
    },
    render() {
        return (
            <View style={ styles.container }>

                <Text>Search</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default SearchView;
