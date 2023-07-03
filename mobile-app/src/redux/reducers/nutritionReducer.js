const nutritionState = {
  nutritionDone: 300,
  nutritionGoal: 1200,
  nutrition: [
    {
      id: 0,
      meal: 'Breakfast',
      foods: [
        {
          id: 0,
          name: 'Eggs',
          calories: 300,
          quantity: '200 grams'
        },
        {
          id: 1,
          name: 'Milk',
          calories: 100,
          quantity: '200 liters'
        }
      ]
    },
    {
      id: 1,
      meal: 'Lunch',
      foods: [
        {
          id: 0,
          name: 'Chicken',
          calories: 150,
          quantity: '200 grams'
        },
        {
          id: 1,
          name: 'Rice',
          calories: 300,
          quantity: '100 grams'
        }
      ]
    }
  ]
};

export const nutritionReducer = (state = nutritionState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_MEAL': {
      newState.nutrition.push(action.meal);
      break;
    }
    case 'REMOVE_MEAL': {
      for (let i = 0; i < newState.nutrition.length; i++) {
        if (newState.nutrition[i].id == action.mealId) {
          newState.nutrition.splice(i, 1);
        }
      }
      break;
    }
    default:
      return newState;
  }
  return newState;
};
