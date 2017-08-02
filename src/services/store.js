import { HttpClient } from 'aurelia-fetch-client';
import Orbit from '@orbit/core';
import Store from '@orbit/store';
import IndexedDBSource from '@orbit/indexeddb';
import JSONAPISource from '@orbit/jsonapi';
import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';

import bucket from 'orbit/buckets';
import schema from 'orbit/schema';


export default class DS {
  constructor() {
    const client = new HttpClient();

    // Use http-fetch-client.
    Orbit.fetch = client.fetch;

    // Memory store.
    this.store = new Store({ bucket, schema });

    // Indexed DB store.
    this.backup = new IndexedDBSource({
      bucket,
      schema,
      name: 'backup',
      namespace: 'apiary',
    });

    this.remote = new JSONAPISource({
      schema,
      name: 'remote',
      host: 'http://private-479d1-jsonapi11.apiary-mock.com',
    });

    // Coordinator
    this.coordinator = new Coordinator({
      sources: [this.store, this.backup, this.remote]
    });

    // Backup sync strategy
    const backupStoreSync = new SyncStrategy({
      source: 'store',
      target: 'backup',

      blocking: true
    });

    // Query the remote server whenever the store is queried
    this.coordinator.addStrategy(new RequestStrategy({
      source: 'store',
      on: 'beforeQuery',

      target: 'remote',
      action: 'pull',

      blocking: true
    }));

    // Update the remote server whenever the store is updated
    this.coordinator.addStrategy(new RequestStrategy({
      source: 'store',
      on: 'beforeUpdate',

      target: 'remote',
      action: 'push',

      blocking: true
    }));

    // Sync all changes received from the remote server to the store
    this.coordinator.addStrategy(new SyncStrategy({
      source: 'remote',
      target: 'store',

      blocking: false
    }));

    this.coordinator.addStrategy(backupStoreSync);
    this.coordinator.activate();
  }
}
