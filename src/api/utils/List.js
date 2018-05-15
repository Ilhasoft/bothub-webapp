import request from '../request';


export default class List {
  items = [];

  constructor(initial) {
    this.nextEntryPoint = initial;
  }

  get hasNext() {
    return !!this.nextEntryPoint;
  }

  async next() {
    const response = await request.$http.get(this.nextEntryPoint);
    this.nextEntryPoint = response.data.next;
    this.items = this.items.concat(response.data.results);
    return this.items;
  }

  get empty() {
    return this.items.length === 0;
  }
}
