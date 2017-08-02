import LocalStorageBucket from '@orbit/local-storage-bucket';
import IndexedDBBucket, { supportsIndexedDB } from '@orbit/indexeddb-bucket';

const BucketClass = supportsIndexedDB ? IndexedDBBucket : LocalStorageBucket;
const bucket = new BucketClass({ namespace: 'my-app' });

export default bucket;
