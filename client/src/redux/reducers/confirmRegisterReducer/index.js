import { CONFIRM_REGISTER_SUCCESS, CONFIRM_REGISTER_ERROR } from '../../types';

const initialState = {
    userConfirmed: false
};

const confirmRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRM_REGISTER_SUCCESS:
            return {...state, userConfirmed: true};
        case CONFIRM_REGISTER_ERROR:
            return state;
        default:
            return state;
    }
}

export default confirmRegisterReducer;
