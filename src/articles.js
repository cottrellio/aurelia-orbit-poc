import { inject } from 'aurelia-framework';
import DS from 'services/store';

@inject(DS)
export class Articles {
  constructor(ds) {
    this.ds = ds;
  }

  getArticles() {
    return this.ds.store.query(q => q.findRecords('article'));
  }

  async activate() {
    this.articles = await this.getArticles();
  }
}
