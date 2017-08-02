import { inject } from 'aurelia-framework';
import DS from 'services/store';

@inject(DS)
export class App {
  constructor(ds) {
    this.ds = ds;

    // ds.store.query(q => q.findRecords('article'))
    //   .then(articles => {
    //     console.log('[REMOTE]', articles);
    //     console.log('[CACHE]', ds.store.cache.query(q => q.findRecords('article')));
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
  }

  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      { route: 'articles',         name: 'articles',        moduleId: './articles',        nav: true, title: 'Articles' },
    ]);

    this.router = router;
  }
}
