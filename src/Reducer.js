import Constants from './Constants';

export default (state, { type, payload }) => {
  switch (type) {
    case Constants.LOGIN_USER: {
      return {
        ...state,
        isAuth: true,
        currentUser: payload,
      };
    }

    case Constants.SIGNOUT_USER: {
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
    }

    case Constants.ADD_FCE: {
      return {
        ...state,
        fces: [
          ...state.fces,
          payload,
        ],
      };
    }

    case Constants.REMOVE_FCE: {
      return {
        ...state,
        fces: state.fces.filter(f => f.id !== payload.id),
        currentFce: (state.currentFce && state.currentFce.id === payload.id) ? null : state.currentFce,
      };
    }

    case Constants.SET_CURRENT_FCE: {
      return {
        ...state,
        currentFce: payload,
      };
    }

    default: { return state; }
  }
};
