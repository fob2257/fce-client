import constants from './constants';

export default dispatch => ({
  addFce: payload => dispatch({ type: constants.ADD_FCE, payload }),
  removeFce: payload => dispatch({ type: constants.REMOVE_FCE, payload }),
  setCurrentFce: payload => dispatch({ type: constants.SET_CURRENT_FCE, payload }),
});
