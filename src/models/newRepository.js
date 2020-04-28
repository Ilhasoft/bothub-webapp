/* eslint-disable class-methods-use-this */
import ModelBase from './base';

class NewRepositoryModel extends ModelBase {
  defaults() {
    return {
      name: '',
      language: '',
      categories: [],
      description: '',
      is_private: false,
    };
  }

  mutations() {
    return {
      uuid: String,
      language: String,
      categories: Object,
      description: String,
      is_private: Boolean,
    };
  }

  routes() {
    return {
      save: '/v2/repository/repository-details/',
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
