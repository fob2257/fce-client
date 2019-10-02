import constants from './constants';

export const initialState = {
  fces: [],
  currentFce: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.ADD_FCE: {
      return {
        ...state,
        fces: [
          // ...state.fces,
          ...payload,
        ],
      };
    }

    case constants.REMOVE_FCE: {
      return {
        ...state,
        fces: state.fces.filter(f => f.id !== payload.id),
        currentFce: (state.currentFce && state.currentFce.id === payload.id) ? null : state.currentFce,
      };
    }

    case constants.SET_CURRENT_FCE: {
      return {
        ...state,
        currentFce: payload,
      };
    }

    default: { return state; }
  }
};
