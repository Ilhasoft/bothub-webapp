import org from '@/api/org';

export default {
  async getAllOrgs() {
    const response = await org.getAll();
    return response;
  },

  async getOrg(store, { nickname }) {
    const response = await org.getOrg(nickname);
    return response;
  },

  async editOrg(store, { data, nickname }) {
    return org.editOrg(data, nickname);
  },

  async getNewOrgSchema() {
    return org.getNewOrgSchema();
  },

  async getEditOrgSchema() {
    return org.getEditOrgSchema();
  },

  async createOrg(store, data) {
    return org.createOrg(data);
  },
};
