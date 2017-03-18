import React, { PropTypes } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    let { days, data } = this.props;
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    if (data && data.days) {
        days = days.map(day => {
            if (data.days.indexOf(day.value) > -1) {
                day.selected = true;
            }

            return day;
        })
    }

    return {
        days,
        dataSource: ds.cloneWithRows(days)
    }
  },
  selectDay(index){
    const oldDays = this.state.days;
    const days = oldDays.slice();

    days[index] = { ...oldDays[index], selected: !oldDays[index].selected };
    this.setState({
        days,
        dataSource: this.state.dataSource.cloneWithRows(days),
    });
    this.props.setSceneParams({
        days: days.filter(day => day.selected).map(day => day.value)
    });
  },
  render() {
    return (
      <View style={ styles.container }>
        <ListView
            dataSource={ this.state.dataSource }
            renderRow={ (day, p, index) =>
            <TouchableOpacity
                onPress={ () => this.selectDay(index) }
                style={styles.limitButton}>
              <Text>{ day.value }</Text>
                { day.selected && <Icon name="check" size={22} /> }
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
  },
  bigButtonText:{
    marginLeft: 5,
    fontSize:14
  }
});

export default DayView;
