import qs from 'query-string';
import request from '../request';

export default class Page {
  constructor(entryPoint, perPage, params) {
    this.total = 0;
    this.entryPoint = entryPoint;
    this.perPage = perPage;
    this.loading = false;
    this.params = params;
    this.items = [];
  }

  async fetchItems(page) {
    this.page = page;
    const queryString = qs.stringify({
      limit: this.perPage,
      offset: (this.page - 1) * this.limit,
      ...this.params,
    });
    this.loading = true;
    const response = await request.$http.get(`${this.baseUrl}?${queryString}`);
    this.loading = false;
    this.total = response.data.count;
    this.items = response.data.results;
    return this.items;
  }

  get empty() {
    return !this.loading && this.items.length === 0;
  }
}
