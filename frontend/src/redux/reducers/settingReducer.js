/* eslint-disable comma-dangle */
const settingState = {
  settings: [
    {
      id: 0,
      title: 'Push Notification',
      name: 'pushNotification',
      switch: false
    },
    {
      id: 1,
      title: 'Subscribe Email',
      name: 'subscribeEmail',
      switch: false
    }
  ]
};

export const settingReducer = (state = settingState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_SETTINGS': {
      newState.settings.map(data => {
        if (data.id == action.id) {
          data.switch = !data.switch;
        }
      });
      break;
    }
    default:
      return newState;
  }

  return newState;
};
