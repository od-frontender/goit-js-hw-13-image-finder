const BASE_URL = 'https://pixabay.com/api';
const KEY = '23033623-b70795456acd26c564a94f9ff';

export default class FetchImageApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchImage() {
    const res = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    );
    const { hits } = await res.json();
    this.incrPage();
    return hits;
  }

  get query() {
    return this.page;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
