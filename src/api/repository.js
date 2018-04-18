import request from './request';

export default {
  async getNewSchema() {
    const { data } = await request.$http.options('/repository/new/');
    return data.actions.POST;
  },
  async new(name, slug, language, categories, description = '', isPrivate = false) {
    const { data } = await request.$http.post(
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
    return data;
  },
};
