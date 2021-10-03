import { GET_USER_LIST_SUCCESS, GET_USER_LIST_ERROR } from '../../types';

const initialState = {
    requestSent: false,
    userList: []
};

const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LIST_SUCCESS:
            return {
                requestSent: true,
                userList: action.payload
            };
        case GET_USER_LIST_ERROR:
            return {
                ...state,
                requestSent: true,
                errorMessage: action.payload.msg
            };
        default:
            return state;
    }
}

export default userListReducer;
