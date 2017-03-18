import {connect} from 'react-redux';
import DayView from './DayView';
import { setSceneParams, popRoute } from '../../modules/navigation/NavigationState';

export default connect(
    state => {
        return {
            days: state.get('days').toJS().map(value => ({
                value, selected: false
            }))
        }
    },
    dispatch => ({
        setSceneParams(params) {
            dispatch(setSceneParams(params));
        },
        popRoute() {
            dispatch(popRoute());
        },
    })
)(DayView);