/* eslint-disable class-methods-use-this */
import ModelBase from './base';
import store from '@/store';


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
      save: '/login/',
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
