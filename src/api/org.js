import request from './request';
import utils from './utils';

export default {
  getAll(limit = 21) {
    return new utils.Page('v2/org/organization/', limit);
  },

  getOrg(nickname) {
    return request.$http.get(`/v2/org/organization/${nickname}/`);
  },

  editOrg(data, nickname) {
    return request.$http.patch(`/v2/org/organization/${nickname}/`, data);
  },

  async getNewOrgSchema() {
    const { data } = await request.$http.options('/v2/org/organization/');
    return data.actions.POST;
  },

  async getEditOrgSchema(nickname) {
    const { data } = await request.$http.options(`/v2/org/organization/${nickname}/`);
    return data.actions.PATCH;
  },

  async createOrg(data) {
    return request.$http.post('/v2/org/organization/', data);
  },
};
