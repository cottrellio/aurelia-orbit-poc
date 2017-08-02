import { HttpClient } from 'aurelia-fetch-client';
import Orbit from '@orbit/core';
import Store from '@orbit/store';
import IndexedDBSource from '@orbit/indexeddb';
import JSONAPISource from '@orbit/jsonapi';

import bucket from 'orbit/buckets';
import schema from 'orbit/schema';
import AppCoordinator, { remotePullRequest, remotePushRequest, remoteStoreSync, backupStoreSync } from 'orbit/coordinators';


// polyfill fetch client conditionally
const fetchPolyfill = !self.fetch
  ? System.import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

export default class DS {
  constructor() {
    this.configureOrbit();

    // Memory store.
    this.store = new Store({ schema });

    // Indexed DB store.
    this.backup = new IndexedDBSource({
      schema,
      name: 'backup',
      namespace: 'apiary',
    });

    this.remote = new JSONAPISource({
      schema,
      name: 'remote',
      host: 'http://private-479d1-jsonapi11.apiary-mock.com',
    });

    this.coordinator = this.configureCoordinator(AppCoordinator);
    this.coordinator.activate();
  }

  async configureOrbit() {
    await fetchPolyfill;
    const client = new HttpClient();

    // Use http-fetch-client.
    Orbit.fetch = client.fetch;
  }

  configureCoordinator(coordinator) {
    coordinator.addSource(this.store);
    coordinator.addSource(this.backup);
    coordinator.addSource(this.remote);

    coordinator.addStrategy(remotePullRequest);
    coordinator.addStrategy(remotePushRequest);
    coordinator.addStrategy(remoteStoreSync);
    coordinator.addStrategy(backupStoreSync);

    return coordinator;
  }
}
