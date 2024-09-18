import {combineReducers} from 'redux';
import loginReducer from './MemberModule';

const rootReducer = combineReducers({
    loginReducer
});

export default rootReducer;