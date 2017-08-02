import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';


// App coordinator
const AppCoordinator = new Coordinator();

export default AppCoordinator;

// Query the remote server whenever the store is queried
const remotePullRequest = new RequestStrategy({
  source: 'store',
  on: 'beforeQuery',

  target: 'remote',
  action: 'pull',

  blocking: true
});

// Update the remote server whenever the store is updated
const remotePushRequest = new RequestStrategy({
  source: 'store',
  on: 'beforeUpdate',

  target: 'remote',
  action: 'push',

  blocking: true
});

// Sync all changes received from the remote server to the store
const remoteStoreSync = new SyncStrategy({
  source: 'remote',
  target: 'store',

  blocking: false
});

// Backup store sync strategy
const backupStoreSync = new SyncStrategy({
  source: 'store',
  target: 'backup',

  blocking: true
});

export { remotePullRequest, remotePushRequest, remoteStoreSync, backupStoreSync };
