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
    const model = await this.getModel();

    console.log(model);
    this.model = model;
  }

  getModel() {
    this.isLoadingModel = true;

    return this.ds.store.query(q => q.findRecords(this.modelName)).then((records) => {
      this.isLoadingModel = false;

      return records;
    });
  }
}
