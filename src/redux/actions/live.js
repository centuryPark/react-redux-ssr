export const GET_LIVE_LIST = 'GET_LIVE_LIST';

export const liveList = (data) => {
  return {
    type: GET_LIVE_LIST,
    data,
  }
};

function fetchList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = [
        {
          id: 1,
          content: 'a',
          value: 11
        },
        {
          id: 2,
          content: 'b',
          value: 12
        },
        {
          id: 3,
          content: 'c',
          value: 13
        },
        {
          id: 4,
          content: 'd',
          value: 14
        },
        {
          id: 5,
          content: 'e',
          value: 15
        },
      ];
      resolve(result);
    }, 1000)
  })
}

export const getLiveList = () => {
  return (dispatch) =>{
    return fetchList().then((result) => {
      dispatch(liveList(result));
    });
  }
};
