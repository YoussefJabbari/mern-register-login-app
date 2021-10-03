import { LOGIN_SUCCESS, LOGIN_ERROR } from '../../types';

const initialState = {
    isAuthenticated: false,
    user: {
        id: '',
        name: '',
    }
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isAuthenticated: !state.isAuthenticated,
                user: action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                errorMessage: action.payload.msg
            };
        default:
            return state;
    }
}

export default loginReducer;
