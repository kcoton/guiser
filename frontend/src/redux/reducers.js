import { LOGIN, LOGOUT } from './actions';

const initState = { user: null }

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.value
      };
    case LOGOUT: 
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};
