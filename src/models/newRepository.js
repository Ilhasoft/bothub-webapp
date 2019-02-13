/* eslint-disable class-methods-use-this */
import ModelBase from './base';
import store from '@/store';


class NewRepositoryModel extends ModelBase {
  defaults() {
    return {
      name: '',
      slug: '',
      language: '',
      categories: [],
      description: '',
      is_private: false,
      algorithm: '',
      use_competing_intents: false,
    };
  }

  mutations() {
    return {
      uuid: String,
      slug: String,
      language: String,
      categories: Array,
      description: String,
      is_private: Boolean,
      algorithm: String,
      use_competing_intents: Boolean,
    };
  }

  routes() {
    return {
      save: '/repository/new/',
    };
  }

  onSaveSuccess(response) {
    super.onSaveSuccess(response);

    store.dispatch(
      'newRepository',
      {
        name: this.name,
        slug: this.slug,
        language: this.language,
        categories: this.categories,
        description: this.description,
        is_private: this.is_private,
        algorithm: this.algorithm,
        use_competing_intents: this.use_competing_intents,
      },
    );
  }
}

export default NewRepositoryModel;
