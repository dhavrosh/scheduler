import {connect} from 'react-redux';
import DashboardView from './DashboardView';

export default connect(
  state => ({
    // loading: state.getIn(['amplitude', 'loading']),
  })
)(DashboardView);
