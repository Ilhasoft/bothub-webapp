import request from './request';


export default {
  async getLoginSchema() {
    const { data } = await request.$http.options('/v2/account/login/');
    return data.actions.POST;
  },
  login(username, password) {
    return request.$http.post(
      '/v2/account/login/',
      {
        username,
        password,
      },
    );
  },
  async getForgotPasswordSchema() {
    const { data } = await request.$http.options('/v2/account/forgot-password/');
    return data.actions.POST;
  },
  forgotPassword(email) {
    return request.$http.post(
      '/v2/account/forgot-password/',
      {
        email,
      },
    );
  },
  async getResetPasswordSchema(nickname) {
    const { data } = await request.$http.options(`/v2/account/reset-password/${nickname}/`);
    return data.actions.PUT;
  },
  resetPassword(nickname, token, password) {
    return request.$http.put(
      `/v2/account/reset-password/${nickname}/`,
      {
        token,
        password,
      },
    );
  },
  async getRegisterSchema() {
    const { data } = await request.$http.options('/v2/account/register/');
    return data.actions.POST;
  },
  register(email, name, nickname, password) {
    return request.$http.post(
      '/v2/account/register/',
      {
        email,
        name,
        nickname,
        password,
      },
    );
  },
};
