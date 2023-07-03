const communityState = {
  posts: [
    {
      id: 0,
      photoUrl:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-how-to-make-a-smoothie-horizontal-1542310071.png',
      title: 'Yummy breakfast on weekend',
      author: 'Paul Graham',
      authorImg:
        'https://images.unsplash.com/photo-1520974735194-9e0ce82759fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      time: '6 minutes',
      likes: 45,
      liked: false,
      comments: [
        {
          id: 0,
          text: 'Looking really nice',
          authorName: 'Alex Altman',
          authorPhoto:
            'https://images.unsplash.com/photo-1520911831154-12889531673c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
          time: '10 minutes'
        }
      ]
    },
    {
      id: 1,
      photoUrl:
        'https://cimg2.ibsrv.net/cimg/www.fitday.com/693x350_85-1/370/calf-20raise_000027830750_Small-107370.jpg',
      title: 'Leg Day, best day',
      author: 'Ben Horrowitz',
      authorImg:
        'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      time: '6 minutes',
      likes: 45,
      liked: false,
      comments: [
        {
          id: 0,
          text: 'Nice legs mate, keep it up!',
          authorName: 'Michael Bond',
          authorPhoto:
            'http://www.myiconfinder.com/uploads/iconsets/256-256-bc5bc94028aad33b071cad66f89f9270-businessman.png',
          time: '12 minutes'
        }
      ]
    }
  ]
};

export const communityReducer = (state = communityState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_POST': {
      newState.posts.push(action.post);
      break;
    }
    case 'ADD_LIKE': {
      newState.posts.map(data => {
        if (data.id == action.id) {
          data.liked = !data.liked;
          if (data.liked) {
            data.likes += 1;
          } else {
            data.likes -= 1;
          }
        }
      });
      break;
    }
    case 'ADD_COMMENT': {
      newState.posts.map(data => {
        if (data.id == action.postId) {
          data.comments.push(action.comment);
        }
      });
      break;
    }
    default:
      return newState;
  }
  return newState;
};
