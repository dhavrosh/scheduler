import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View,
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter
} from 'react-native';

const DashboardView = React.createClass({
  propTypes: {
    classes: PropTypes.array.isRequired,
  },
  getInitialState() {
      return {}
  },
  render() {
    const { classes } = this.props;
    const isClassesEmpty = classes && classes.length === 0;

    return (
      <View style={styles.container}>
        { !isClassesEmpty && classes.map(classObj => <Text key={`class-${classObj.title.value}`}>{classObj.title.value}</Text>)
          || <Text>There no any available classes</Text>
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DashboardView;
