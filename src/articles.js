import { computedFrom, inject } from 'aurelia-framework';
import DS from 'services/store';

@inject(DS)
export class Articles {
  constructor(ds) {
    this.ds = ds;
    this.modelName = 'article';
    this.model = [];
  }

  async activate() {
    this.model = await this.getModel();
  }

  getModel() {
    return this.ds.store.query(q => q.findRecords(this.modelName))
      .then()
      .catch(e => console.error('[YOMAMA]', e));
  }
}
