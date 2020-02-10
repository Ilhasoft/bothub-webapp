import qs from 'query-string';
import request from '../request';

export default class Page {
  constructor(baseUrl, perPage, params) {
    this.total = 0;
    this.baseUrl = baseUrl;
    this.perPage = perPage;
    this.loading = false;
    this.params = params;
    this.items = [];
  }

  async updateItems(page) {
    this.page = page;
    this.items = [];
    this.loading = true;
    try {
      const response = await this.fetchItems(page);
      this.loading = false;
      this.total = response.data.count;
      this.items = response.data.results;
      return this.items;
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }

  async getAllItems() {
    this.loading = true;
    try {
      this.items = await this.fetchAll([], 1);
      this.total = this.items.count;
      this.loading = false;
      this.page = 1;
      return this.items;
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }

  async fetchItems(page) {
    const queryString = qs.stringify({
      limit: this.perPage,
      offset: (page - 1) * this.perPage,
      ...this.params,
    });
    return request.$http.get(`${this.baseUrl}?${queryString}`);
  }

  get empty() {
    return !this.loading && this.items.length === 0;
  }

  async fetchAll(items, startingPage) {
    const response = await this.fetchItems(startingPage);
    const updatedItems = [...items, ...response.data.results];
    if (response.data.next === null) { return updatedItems; }
    return this.fetchAll(updatedItems, startingPage + 1);
  }
}
