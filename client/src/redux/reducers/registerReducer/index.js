import { REGISTER_SUCCESS, REGISTER_ERROR } from '../../types';

const initialState = {
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
            return action.payload;
        case REGISTER_ERROR:
            return state;
        default:
            return state;
    }
}

export default registerReducer;
