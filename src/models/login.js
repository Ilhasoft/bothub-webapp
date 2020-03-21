/* eslint-disable class-methods-use-this */
import store from '@/store';
import ModelBase from './base';


class Login extends ModelBase {
  defaults() {
    return {
      username: '',
      password: '',
    };
  }

  mutations() {
    return {
      email: String,
      password: Number,
    };
  }

  routes() {
    return {
      save: '/v2/account/login/',
    };
  }

  onSaveSuccess(response) {
    super.onSaveSuccess(response);
    store.dispatch(
      'login',
      {
        username: this.username,
        password: this.password,
      },
    );
  }
}

export default Login;
