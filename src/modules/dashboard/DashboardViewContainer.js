import {connect} from 'react-redux';
import DashboardView from './DashboardView';

export default connect(
  state => ({ classes: state.getIn(['classes']).toJS() })
)(DashboardView);
