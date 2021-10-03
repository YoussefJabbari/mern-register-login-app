import { REGISTER_SUCCESS, REGISTER_ERROR } from '../../types';

const registerState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }
};

const registerReducer = (state = registerState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            console.log('registerReducer', action.payload);
            return action.payload;
        case REGISTER_ERROR:
            return state;
        default:
            return state;
    }
}

export default registerReducer;
