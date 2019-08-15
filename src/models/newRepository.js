/* eslint-disable class-methods-use-this */
import ModelBase from './base';

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
      categories: Object,
      description: String,
      is_private: Boolean,
      algorithm: String,
      use_competing_intents: Boolean,
    };
  }

  routes() {
    return {
      save: '/v2/repository/repository/',
    };
  }

  getSaveData() {
    const attrsValues = super.getSaveData();
    if (typeof attrsValues.categories === 'string') {
      attrsValues.categories = attrsValues.categories.split(',');
    }
    return attrsValues;
  }
}

export default NewRepositoryModel;
