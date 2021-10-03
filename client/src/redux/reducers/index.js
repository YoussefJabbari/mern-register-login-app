import { combineReducers } from 'redux';
import registerReducer from './registerReducer/index';
import confirmRegisterReducer from './confirmRegisterReducer/index';

const reducers = combineReducers({
    register: registerReducer,
    confirmRegister: confirmRegisterReducer
})

export default reducers;
