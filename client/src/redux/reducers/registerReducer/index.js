import { REGISTER_SUCCESS, REGISTER_ERROR } from '../../types';

const initialState = {
    userRegistered: false,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                userRegistered: true
            };
        case REGISTER_ERROR:
            return {
                ...state,
                errorMessage: action.payload.msg
            };
        default:
            return state;
    }
}

export default registerReducer;
