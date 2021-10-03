import { combineReducers } from 'redux';

import registerReducer from './registerReducer/index';
import confirmRegisterReducer from './confirmRegisterReducer/index';
import loginReducer from './loginReducer/index';

const reducers = combineReducers({
    register: registerReducer,
    confirmRegister: confirmRegisterReducer,
    login: loginReducer
})

export default reducers;
