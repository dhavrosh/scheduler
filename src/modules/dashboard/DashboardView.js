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
import styles from '../../styles';
import { pushRoute } from '../navigation/NavigationState';
import { getClasses } from '../../services/mainService';

const DashboardView = React.createClass({
  propTypes: {
    classes: PropTypes.array.isRequired,
  },
  redirectToPreviewClass(Class){
    this.props.dispatch(pushRoute({
      key: 'PreviewClass',
      title: `${Class.title.value} Class`,
      subtitle: '2017 - 2018',
      data: { Class },
      navigationExtended: true,
      showRightComponent: 'true',
      iconName: 'edit',
    }));
  },
  getClassItem(classObj, index) {
      const redirectToClassCover = () => this.redirectToPreviewClass(classObj.value);

      return (
          <TouchableOpacity
              onPress={ redirectToClassCover }
              style={[styles.dashboardItem, styles.classItem, index === 0 && styles.classItemBordered]}
              title={ `${index}` }
              key={ `class-${index}` }>
            <View>
              <Text>{ classObj.start }</Text>
              <Text>{ classObj.end }</Text>
            </View>
            <Text style={styles.classText}>{ classObj.value.title.value }</Text>
            <View><Text>Location</Text></View>
          </TouchableOpacity>
      )
  },
  render() {
    const classes = getClasses(this.props.classes);
    const isClassesEmpty = classes && classes.today.length === 0
        && classes.tomorrow.length === 0;
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <View style={[styles.container, isClassesEmpty && styles.containerCenter]}>

        { !isClassesEmpty &&
          <View>
            { classes.today.length > 0 &&
            <View>
              <View style={styles.labelContainer}>
                <Text>Today - { today.toLocaleDateString() }</Text>
              </View>
              { classes.today.map(this.getClassItem) }
            </View>
            }
            { classes.tomorrow.length > 0 &&
            <View>
              <View style={styles.labelContainer}>
                <Text>Tomorrow - { tomorrow.toLocaleDateString() }</Text>
              </View>
              { classes.tomorrow.map(this.getClassItem) }
            </View>
            }
          </View>
          || <Text>There no any coming classes</Text>
        }
      </View>
    );
  }
});

export default DashboardView;
