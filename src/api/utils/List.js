import request from '../request';


export default class List {
  items = [];

  constructor(initial) {
    this.initial = initial;
    this.nextEntryPoint = initial;
  }

  get hasNext() {
    return !this.loading && !!this.nextEntryPoint;
  }

  async next() {
    this.loading = true;
    const response = await request.$http.get(this.nextEntryPoint);
    this.nextEntryPoint = response.data.next;
    this.items = this.items.concat(response.data.results);
    this.loading = false;
    return this.items;
  }

  get empty() {
    return !this.loading && this.items.length === 0;
  }

  async reset() {
    this.items = [];
    this.nextEntryPoint = this.initial;
  }
}
