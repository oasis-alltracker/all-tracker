const waterState = {
  waterDone: 3,
  waterGoal: 8
};

export const waterReducer = (state = waterState, action) => {
  switch (action.type) {
    case 'INCREMENT_WATER': {
      state = { ...state, waterDone: state.waterDone + 1 };
      break;
    }
    case 'DECREMENT_WATER': {
      state = { ...state, waterDone: state.waterDone - 1 };
      break;
    }
    default:
      return state;
  }
  return state;
};
