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
    // amplitude: PropTypes.number.isRequired,
  },
  getInitialState() {
      return {}
  },
  render() {
    return (
      <View style={styles.container}>
        <Text>
          There no any available classes
        </Text>
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
