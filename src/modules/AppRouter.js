/*eslint-disable react/prop-types*/

import React from 'react';
import DahsboardViewContainer from './dashboard/DashboardViewContainer';
import ClassViewContainer from './class/ClassViewContainer';
import EditClassContainer from './class/EditClassViewContainer';

/*import SettingsViewContainer from './settings/SettingsViewContainer';
import DecibelPickerContainer from './decibelPicker/DecibelPickerViewContainer';*/

export default function AppRouter(props) {
  const key = props.scene.route.key;
  const data = props.scene.route.data;

  if (key === 'Dashboard') {
    return <DahsboardViewContainer/>;
  }

  if (key === 'Class') {
    return <ClassViewContainer data={ data } />;
  }

  if (key === 'EditClass') {
    return <EditClassContainer data={ data } />;
  }

  /*
  if (key === 'Limits') {
    return <LimitsViewContainer />;
  }

  if (key === 'Settings') {
    return <SettingsViewContainer/>;
  }*/

  throw new Error('Unknown navigation key: ' + key);
}
