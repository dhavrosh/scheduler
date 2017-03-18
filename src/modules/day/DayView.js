import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ListView,
  View,
  TimePickerAndroid
} from 'react-native';

const DayView = React.createClass({
  propTypes: {
    setSceneParams: PropTypes.func.isRequired,
    days: PropTypes.array.isRequired
  },
  getInitialState() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return { days: ds.cloneWithRows(this.props.days) }
  },
  selectDay(days){
    this.props.setSceneParams({ days });
    this.props.popRoute();
  },
  render() {
    return (
      <View style={ styles.container }>
        <ListView
            dataSource={ this.state.days }
            renderRow={value =>
            <TouchableOpacity
                onPress={() => this.selectDay(value)}
                style={styles.limitButton}>
              <Text>{ value }</Text>
            </TouchableOpacity>
            }
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    margin: 30
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  limitButton: {
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
  },
  daysValue: {
      paddingLeft: 10,
      fontSize: 15,
  }
});

export default DayView;
