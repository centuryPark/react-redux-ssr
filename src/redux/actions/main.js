export const GET_MAIN_INFO = 'GET_MAIN_INFO';

export const mainInfo = data => ({
  type: GET_MAIN_INFO,
  data,
});

function fetchInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {
        id: 'qe242kdmwkdiowjio2343e',
        name: 'park',
        desc: '一个首屏ssr的react脚手架',
      };
      resolve(result);
    }, 1000);
  });
}

export const getMainInfo = () => dispatch => fetchInfo().then((result) => {
  dispatch(mainInfo(result));
});
