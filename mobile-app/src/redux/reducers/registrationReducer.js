const registrationState = {
  userPhoto: 'https://i.dlpng.com/static/png/1244305--profile-png-512_512_preview.png',
  userName: 'Mark',
  userEmail: '',
  userPassword: '',
  userGender: '',
  userInterests: '',
  userHelp: ''
};

export const registrationReducer = (state = registrationState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_USEREMAIL': {
      newState.userEmail = action.email;
      break;
    }
    case 'ADD_USERNAME': {
      newState.userName = 'Mark';
      break;
    }
    case 'ADD_USERINTERESTS': {
      newState.userInterests = action.interests;
      break;
    }
    default:
      return newState;
  }
  return newState;
};
