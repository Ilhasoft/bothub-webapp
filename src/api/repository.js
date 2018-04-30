import request from './request';
import utils from './utils';


export default {
  async getNewSchema() {
    const { data } = await request.$http.options('/repository/new/');
    return data.actions.POST;
  },
  new(name, slug, language, categories, description = '', isPrivate = false) {
    return request.$http.post(
      '/repository/new/',
      {
        name,
        slug,
        language,
        categories,
        description,
        is_private: isPrivate,
      },
    );
  },
  getAll() {
    return new utils.List('/repositories/');
  },
};
