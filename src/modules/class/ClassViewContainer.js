import { connect } from 'react-redux';
import ClassView from './ClassView';

export default connect(
    state => ({ classes: state.getIn(['classes']).toJS() })
)(ClassView);
