import { combineReducers } from 'redux';

import registerReducer from './registerReducer/index';
import confirmRegisterReducer from './confirmRegisterReducer/index';
import loginReducer from './loginReducer/index';
import userListReducer from './userListReducer/index';

const reducers = combineReducers({
    register: registerReducer,
    confirmRegister: confirmRegisterReducer,
    login: loginReducer,
    userList: userListReducer
})

export default reducers;
