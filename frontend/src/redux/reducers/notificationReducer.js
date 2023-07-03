const notificationState = {
  notifications: [
    {
      id: 0,
      read: false,
      authorName: 'Mark Cuban',
      authorImg:
        'http://www.myiconfinder.com/uploads/iconsets/256-256-eb96923b7137f6ece140cf2a2d794a56-businessman.png',
      text: 'left 2 comments on your post.',
      time: '6 minutes ago'
    },
    {
      id: 1,
      read: false,
      authorName: 'Mark Cuban',
      authorImg:
        'http://www.myiconfinder.com/uploads/iconsets/256-256-eb96923b7137f6ece140cf2a2d794a56-businessman.png',
      text: 'liked your recent 10 photos.',
      time: '6 minutes ago'
    },
    {
      id: 2,
      read: true,
      authorName: 'Chris Sacca',
      authorImg: 'https://image.flaticon.com/icons/png/512/122/122445.png',
      text: 'left a comment on your post "Keep up the good work" ! ',
      time: '6 minutes ago'
    },
    {
      id: 3,
      read: true,
      authorName: '',
      authorImg:
        'data:image/png;base64,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',
      text: 'You have successfully registered on FitnessApp !',
      time: '6 minutes ago'
    }
  ]
};

export const notificationReducer = (state = notificationState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_NOTIFICATIONS': {
      newState.notifications.map(data => {
        if (data.id == action.id) {
          data.read = true;
        }
      });
      break;
    }
    default:
      return newState;
  }

  return newState;
};
