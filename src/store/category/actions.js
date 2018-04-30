import category from '@/api/category';

export default {
  async getAllCategories() {
    const response = await category.getAll();
    return response;
  },
};
