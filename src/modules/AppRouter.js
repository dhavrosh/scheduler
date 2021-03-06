/*eslint-disable react/prop-types*/

import React from 'react';
import DashboardViewContainer from './dashboard/DashboardViewContainer';
import ClassViewContainer from './class/ClassViewContainer';
import PreviewClassViewContainer from './class/PreviewClassViewContainer';
import EditClassContainer from './class/EditClassViewContainer';
import TimeViewContainer from './time/TimeViewContainer';
import DayViewContainer from './day/DayViewContainer';
import SearchViewContainer from './search/SearchViewContainer';

export default function AppRouter(props) {
  const key = props.scene.route.key;
  const data = props.scene.route.data;

  if (key === 'Dashboard') {
    return <DashboardViewContainer/>;
  }

  if (key === 'Class') {
    return <ClassViewContainer data={ data }/>;
  }

  if (key === 'PreviewClass') {
    return <PreviewClassViewContainer data={ data }/>;
  }

  if (key === 'EditClass') {
    return <EditClassContainer data={ data }/>;
  }

  if (key === 'Time') {
    return <TimeViewContainer data={ data }/>;
  }

  if (key === 'Day') {
    return <DayViewContainer data={ data }/>;
  }

  if (key === 'Search') {
    return <SearchViewContainer data={ data }/>;
  }

  throw new Error('Unknown navigation key: ' + key);
}
