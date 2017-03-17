/*eslint-disable react/prop-types*/

import React from 'react';
import DahsboardViewContainer from './dashboard/DashboardViewContainer';

/*import SettingsViewContainer from './settings/SettingsViewContainer';
import DecibelPickerContainer from './decibelPicker/DecibelPickerViewContainer';
import LimitsViewContainer from './limits/LimitsViewContainer';
import EditLimitContainer from './editLimits/EditLimitsViewContainer';*/

export default function AppRouter(props) {
  const key = props.scene.route.key;
  const data = props.scene.route.data;

  if (key === 'Dashboard') {
    return <DahsboardViewContainer/>;
  }

  /*if (key === 'Decibel') {
    return <DecibelPickerContainer data={ data } />;
  }
  if (key === 'EditLimit') {
        return <EditLimitContainer data={ data } />;
  }

  if (key === 'Limits') {
    return <LimitsViewContainer />;
  }

  if (key === 'Settings') {
    return <SettingsViewContainer/>;
  }*/

  throw new Error('Unknown navigation key: ' + key);
}
