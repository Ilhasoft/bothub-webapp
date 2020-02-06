import request from '../request';


export default class List {
  constructor(initial) {
    this.total = 0;
    this.itemsList = [];
    this.deletions = [];
    this.initial = initial;
    this.nextEntryPoint = initial;
    this.loading = false;
  }

  get items() {
    return this.itemsList
      .map((data, i) => ({
        id: data.id || data.uuid || data.pk || data.key || i,
        key: data.id || data.uuid || data.pk || data.key || i,
        data: Object.assign(
          {},
          data,
        ),
      }))
      .filter(item => !this.deletions.includes(item.id));
  }

  get hasNext() {
    return !this.loading && !!this.nextEntryPoint;
  }

  async next() {
    if (this.loading) {
      return false;
    }
    this.loading = true;
    const response = await request.$http.get(this.nextEntryPoint);
    this.nextEntryPoint = response.data.next;
    this.itemsList = this.itemsList.concat(response.data.results);
    this.loading = false;
    this.total = response.data.count;
    return this.items;
  }

  get empty() {
    return !this.loading && this.items.length === 0;
  }

  async reset() {
    this.itemsList = [];
    this.deletions = [];
    this.nextEntryPoint = this.initial;
  }

  delete(id) {
    this.deletions.push(id);
    return id;
  }
}
