import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ListView,
    View,
    TimePickerAndroid
} from 'react-native';
import styles from '../../styles';

const DayView = React.createClass({
    propTypes: {
        setSceneParams: PropTypes.func.isRequired,
        days: PropTypes.array.isRequired
    },
    getInitialState() {
        let {days, data} = this.props;
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

        days[index] = {...oldDays[index], selected: !oldDays[index].selected};
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
                <View style={ styles.daysContainer }>
                    <ListView
                        dataSource={ this.state.dataSource }
                        renderRow={ (day, p, index) =>
                            <TouchableOpacity
                                onPress={ () => this.selectDay(index) }
                                style={styles.dayButton}>
                                <View style={styles.dayRow}>
                                    <Text>{ day.value }</Text>
                                    { day.selected && <Icon style={styles.dayCheckedIcon} name="check" size={22}/> }
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        );
    }
});

export default DayView;
