import request from './request';

export default {
  login(username, password) {
    return request.post(
      '/login/',
      {
        username,
        password,
      },
    );
  },
};
