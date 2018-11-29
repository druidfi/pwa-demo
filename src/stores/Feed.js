import { types, flow } from 'mobx-state-tree';
import { Article } from './Article';
import { fetchFeed } from '../functions/fetchFeed';

export const Feed = types.model({
  // Status data
  url: types.string,
  loading: types.optional(types.boolean, false),
  connected: types.optional(types.boolean, false),
  // Fetched data
  id: types.identifier,
  title: types.maybe(types.string),
  date: types.maybe(types.string),
  items: types.optional(types.array(Article), []),
}).actions(self => ({
  refresh: flow(function * () {
    self.loading = true;
    self.connected = true;

    try {
      const feedData = yield fetchFeed(self.url);

      Object.keys(feedData).forEach(property => self[property] = feedData[property]);
    } catch (exception) {
      self.connected = false;
    }

    self.loading = false;

    return self.connected;
  }),
}));
