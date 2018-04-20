import request from './request';

export default {
  login(username, password) {
    return request.$http.post(
      '/login/',
      {
        username,
        password,
      },
    );
  },
  forgotPassword(email) {
    return request.$http.post(
      '/forgot-password/',
      {
        email,
      },
    );
  },
  async getResetPasswordSchema(nickname) {
    const { data } = await request.$http.options(`/reset-password/${nickname}/`);
    return data.actions.PUT;
  },
  resetPassword(nickname, token, password) {
    return request.$http.put(
      `/reset-password/${nickname}/`,
      {
        token,
        password,
      },
    );
  },
  register(email, name, nickname, password) {
    return request.$http.post(
      '/register/',
      {
        email,
        name,
        nickname,
        password,
      },
    );
  },
  profile(nickname) {
    return request.$http.get(
      `/user-profile/${nickname}/`,
    );
  },
  myProfile() {
    return request.$http.get(
      '/my-profile/',
    );
  },
};
