import { Schema } from '@orbit/data';

const schemaDefinition = {
  models: {
    article: {
      attributes: {
        title: { type: 'string' },
      },
    },
  }
};
const schema = new Schema(schemaDefinition);

export default schema;

// user: {
//   attributes: {
//     avatar_url: { type: 'string' },
//     events_url: { type: 'string' },
//     followers_url: { type: 'string' },
//     following_url: { type: 'string' },
//     gists_url: { type: 'string' },
//     gravatar_id: { type: 'string' },
//     html_url: { type: 'string' },
//     id: { type: 'number' },
//     login: { type: 'string' },
//     organizations_url: { type: 'string' },
//     received_events_url: { type: 'string' },
//     repos_url: { type: 'string' },
//     site_admin: { type: 'boolean' },
//     starred_url: { type: 'string' },
//     subscriptions_url: { type: 'string' },
//     type: { type: 'string' },
//     url: { type: 'string' },
//   }
// },
